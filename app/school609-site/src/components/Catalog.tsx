'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Search, X, MapPin, Clock, User, Star, Sparkles, ArrowRight,
  CheckCircle2, Wallet, Gift, Video, Calendar, ArrowLeft,
  Building2, Tag, ChevronRight,
} from 'lucide-react';
import {
  Course, CourseType, Direction,
  DIRECTION_LABELS, AGE_GROUPS, AgeGroup, BUILDINGS,
} from '@/lib/courses';

type TypeFilter = 'all' | CourseType;

const TYPE_FILTERS: { id: TypeFilter; label: string; icon: typeof Wallet }[] = [
  { id: 'all',    label: 'Все',         icon: Sparkles },
  { id: 'budget', label: 'Бесплатные',  icon: Gift },
  { id: 'paid',   label: 'Платные',     icon: Wallet },
];

export default function Catalog({ initialCourses }: { initialCourses: Course[] }) {
  const [courses] = useState<Course[]>(initialCourses);

  // Сначала выбирается возрастная группа — это главный фильтр
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');
  const [directionFilter, setDirectionFilter] = useState<Direction | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Course | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Какие возрастные группы реально присутствуют в данных
  const availableGroups = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => set.add(c.ageGroup));
    return AGE_GROUPS.filter((g) => g.id === 'all' || set.has(g.id));
  }, [courses]);

  // Считаем количество кружков по возрастным группам
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    courses.forEach((c) => {
      counts[c.ageGroup] = (counts[c.ageGroup] || 0) + 1;
    });
    return counts;
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      // Возрастная группа — основной фильтр
      if (ageGroup && ageGroup !== 'all' && c.ageGroup !== ageGroup) return false;
      if (typeFilter !== 'all' && c.type !== typeFilter) return false;
      if (buildingFilter !== 'all' && c.building !== buildingFilter) return false;
      if (directionFilter !== 'all' && c.direction !== directionFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const hay = `${c.name} ${c.shortDescription} ${c.description} ${c.teacher}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [courses, ageGroup, typeFilter, buildingFilter, directionFilter, search]);

  const hasActiveFilters = typeFilter !== 'all' || buildingFilter !== 'all' || directionFilter !== 'all' || search.trim().length > 0;

  const resetFilters = () => {
    setTypeFilter('all');
    setBuildingFilter('all');
    setDirectionFilter('all');
    setSearch('');
  };

  // Сортировка: рекомендуемые первыми, потом по имени
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const ha = Number(a.highlight || false);
      const hb = Number(b.highlight || false);
      if (ha !== hb) return hb - ha;
      return a.name.localeCompare(b.name);
    });
  }, [filtered]);

  // ===========================
  // ЭКРАН 1: Выбор возрастной группы
  // ===========================
  if (!ageGroup) {
    return (
      <section id="courses" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-xs font-bold text-turquoise-dark">
              <Sparkles className="h-3.5 w-3.5" /> Шаг 1 из 2
            </div>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
              Выберите возраст ребёнка
            </h2>
            <p className="mt-3 text-muted-foreground text-base md:text-lg">
              Так мы покажем только те кружки, которые подходят вам по возрасту. Дальше сможете фильтровать по корпусу, направлению и стоимости.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {availableGroups.map((g, idx) => {
              const count = groupCounts[g.id] || 0;
              const isAll = g.id === 'all';
              return (
                <button
                  key={g.id}
                  onClick={() => setAgeGroup(g.id as AgeGroup)}
                  className={`group relative text-left bg-white rounded-3xl p-5 md:p-7 ring-1 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:ring-turquoise/50 ${
                    isAll ? 'ring-dashed ring-2 ring-border' : 'ring-border shadow-sm'
                  } ${idx === 0 ? 'md:col-span-1' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className="grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-2xl text-3xl transition-transform group-hover:scale-110"
                      style={{
                        background: isAll
                          ? 'linear-gradient(135deg, #0FB5B5, #FF8A3D)'
                          : `linear-gradient(135deg, ${DIRECTION_LABELS.sport.color}22, ${DIRECTION_LABELS.creative.color}22)`,
                      }}
                    >
                      {g.icon}
                    </div>
                    {!isAll && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                        {count} {pluralize(count, 'кружок', 'кружка', 'кружков')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-ink leading-tight">
                    {g.label}
                  </h3>
                  <p className="mt-1 text-sm md:text-base font-bold text-turquoise">
                    {g.shortLabel}
                  </p>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {g.desc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-turquoise group-hover:gap-2 transition-all">
                    Выбрать <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            Не уверены, какой возраст?{' '}
            <button
              onClick={() => setAgeGroup('all')}
              className="font-bold text-turquoise hover:underline"
            >
              Показать все кружки
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ===========================
  // ЭКРАН 2: Каталог кружков для выбранной возрастной группы
  // ===========================
  const currentGroup = AGE_GROUPS.find((g) => g.id === ageGroup)!;

  return (
    <section id="courses" className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Хлебные крошки + смена возраста */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <button
              onClick={() => setAgeGroup(null)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-turquoise mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Выбрать другой возраст
            </button>
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl text-2xl"
                style={{ background: `linear-gradient(135deg, ${DIRECTION_LABELS.sport.color}22, ${DIRECTION_LABELS.creative.color}22)` }}
              >
                {currentGroup.icon}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ink leading-tight">
                  {currentGroup.label}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentGroup.shortLabel} · найдено {sorted.length} {pluralize(sorted.length, 'кружок', 'кружка', 'кружков')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Поиск + мобильная кнопка фильтров */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию, преподавателю..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white ring-1 ring-border focus:ring-2 focus:ring-turquoise outline-none text-base font-medium placeholder:text-muted-foreground/60"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-border"
                aria-label="Очистить"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden inline-flex items-center justify-center gap-2 h-14 px-5 rounded-2xl bg-ink text-white font-bold"
          >
            <Calendar className="h-5 w-5" /> Фильтры
          </button>
        </div>

        {/* Чипы фильтра по типу (бюджет/платные) */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {TYPE_FILTERS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  typeFilter === t.id
                    ? 'bg-ink text-white shadow-md'
                    : 'bg-white ring-1 ring-border text-ink/70 hover:ring-turquoise hover:text-turquoise'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}

          <span className="hidden md:block w-px h-6 bg-border mx-1" />

          {/* Направления (десктоп) */}
          <div className="hidden md:flex flex-wrap items-center gap-2">
            {Object.entries(DIRECTION_LABELS).map(([key, dir]) => (
              <button
                key={key}
                onClick={() => setDirectionFilter(directionFilter === key ? 'all' : (key as Direction))}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all ${
                  directionFilter === key
                    ? 'text-white shadow-md'
                    : 'bg-white ring-1 ring-border text-ink/70 hover:ring-2'
                }`}
                style={directionFilter === key ? { backgroundColor: dir.color } : {}}
              >
                <span>{dir.icon}</span>
                {dir.label}
              </button>
            ))}
          </div>
        </div>

        {/* Расширенные фильтры: корпус + направления (мобильный) */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-6`}>
          <div className="bg-white rounded-2xl ring-1 ring-border p-4 md:p-5 grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Корпус */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" /> Корпус
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setBuildingFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                    buildingFilter === 'all'
                      ? 'bg-turquoise text-white'
                      : 'bg-muted text-ink/70 hover:bg-border'
                  }`}
                >
                  Все
                </button>
                {BUILDINGS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBuildingFilter(buildingFilter === b.id ? 'all' : b.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition inline-flex items-center gap-1 ${
                      buildingFilter === b.id
                        ? 'bg-turquoise text-white'
                        : 'bg-muted text-ink/70 hover:bg-border'
                    }`}
                  >
                    {b.isCenter && <Sparkles className="h-3 w-3" />}
                    {b.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Направления (мобильный) */}
            <div className="md:hidden">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" /> Направление
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setDirectionFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${directionFilter === 'all' ? 'bg-ink text-white' : 'bg-muted text-ink/70'}`}
                >
                  Все
                </button>
                {Object.entries(DIRECTION_LABELS).map(([key, dir]) => (
                  <button
                    key={key}
                    onClick={() => setDirectionFilter(directionFilter === key ? 'all' : (key as Direction))}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-muted text-ink/70"
                    style={directionFilter === key ? { backgroundColor: dir.color, color: '#fff' } : {}}
                  >
                    {dir.icon} {dir.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              {hasActiveFilters && (
                <div className="flex items-end justify-end h-full">
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" /> Сбросить фильтры
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Результаты */}
        {sorted.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl ring-1 ring-border">
            <p className="text-2xl font-extrabold text-ink">Ничего не найдено</p>
            <p className="mt-2 text-muted-foreground">Попробуйте сбросить часть фильтров.</p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-turquoise text-white px-5 py-2.5 text-sm font-bold"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {sorted.map((c) => (
              <CourseCard key={c.id} course={c} onClick={() => setSelected(c)} />
            ))}
          </div>
        )}

        {hasActiveFilters && (
          <div className="mt-6 text-center md:hidden">
            <button
              onClick={resetFilters}
              className="text-sm font-semibold text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {selected && <CourseModal course={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

// ===========================
// Карточка кружка
// ===========================
function CourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  const dir = DIRECTION_LABELS[course.direction];
  const isBudget = course.type === 'budget';
  const buildingInfo = BUILDINGS.find((b) => b.id === course.building);

  return (
    <article
      onClick={onClick}
      className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden ring-1 ring-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-20px_rgba(11,36,52,0.25)] hover:ring-turquoise/40"
    >
      {/* Обложка или цветная полоса */}
      {course.image ? (
        <div className="relative aspect-[16/7] overflow-hidden">
          <img
            src={course.image}
            alt={course.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
          {/* Бейджи поверх обложки */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-md"
              style={{ backgroundColor: `${dir.color}E6`, color: '#fff' }}
            >
              {dir.icon} {dir.label}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            {isBudget ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-turquoise/90 text-white px-2 py-0.5 text-xs font-bold backdrop-blur-md">
                <Gift className="h-3 w-3" /> Бесплатно
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange/90 text-white px-2 py-0.5 text-xs font-bold backdrop-blur-md">
                <Wallet className="h-3 w-3" /> Платно
              </span>
            )}
          </div>
          {course.highlight && (
            <div className="absolute bottom-2 left-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-ink/85 text-white px-2 py-0.5 text-xs font-bold backdrop-blur-md">
                <Star className="h-3 w-3 fill-current text-[#FFB400]" /> Рекомендуем
              </span>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${dir.color}, ${DIRECTION_LABELS.creative.color})` }} />
          <div className="p-5 pb-0">
            <div className="flex items-center justify-between gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
                style={{ backgroundColor: `${dir.color}15`, color: dir.color }}
              >
                {dir.icon} {dir.label}
              </span>
              {isBudget ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-turquoise/15 text-turquoise-dark px-2.5 py-1 text-xs font-bold">
                  <Gift className="h-3 w-3" /> Бесплатно
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange/15 text-orange-dark px-2.5 py-1 text-xs font-bold">
                  <Wallet className="h-3 w-3" /> Платно
                </span>
              )}
            </div>
          </div>
        </>
      )}

      {/* Контент */}
      <div className="p-5">
        {/* Бейджи (только если нет обложки — иначе они уже на обложке) */}
        {!course.image && (
          <div className="flex items-center justify-between gap-2 mb-3">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ backgroundColor: `${dir.color}15`, color: dir.color }}
            >
              {dir.icon} {dir.label}
            </span>
            {isBudget ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-turquoise/15 text-turquoise-dark px-2.5 py-1 text-xs font-bold">
                <Gift className="h-3 w-3" /> Бесплатно
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange/15 text-orange-dark px-2.5 py-1 text-xs font-bold">
                <Wallet className="h-3 w-3" /> Платно
              </span>
            )}
          </div>
        )}
        {course.highlight && course.image && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-ink/10 text-ink px-2 py-0.5 text-xs font-bold">
              <Star className="h-3 w-3 fill-current text-[#FFB400]" /> Рекомендуем
            </span>
          </div>
        )}

        <h3 className="font-extrabold text-ink text-lg leading-tight line-clamp-2">
          {course.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {course.shortDescription || course.description?.slice(0, 120)}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-turquoise" /> Корпус {course.building}
          </span>
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-orange" /> {course.ageLabel || `${course.ageMin}–${course.ageMax} лет`}
          </span>
        </div>

        {/* Преподаватель */}
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-turquoise/20 to-orange/20 grid place-items-center text-xs font-bold text-ink/70 flex-shrink-0">
            {course.teacher.split(' ').map(s => s[0]).slice(0, 2).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground leading-tight">Педагог</p>
            <p className="text-sm font-bold text-ink truncate leading-tight mt-0.5">{course.teacher}</p>
          </div>
          {course.videoUrl && (
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-turquoise/10 text-turquoise" title="Есть видео-открытка">
              <Video className="h-4 w-4" />
            </span>
          )}
        </div>

        {/* Цена + CTA */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Стоимость</p>
            <p className={`text-base font-extrabold ${isBudget ? 'text-turquoise' : 'text-ink'}`}>
              {course.price || (isBudget ? 'Бесплатно' : 'По запросу')}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted text-ink px-3 py-2 text-xs font-bold group-hover:bg-turquoise group-hover:text-white transition-colors">
            Подробнее <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {course.seatsLeft !== undefined && course.seatsLeft <= 8 && !isBudget && (
          <div className="mt-3 rounded-xl bg-orange/10 text-orange-dark px-3 py-2 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Осталось {course.seatsLeft} {pluralize(course.seatsLeft, 'место', 'места', 'мест')}!
          </div>
        )}
      </div>
    </article>
  );
}

// ===========================
// Модальное окно с деталями + VK Видео
// ===========================
function CourseModal({ course, onClose }: { course: Course; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const dir = DIRECTION_LABELS[course.direction];
  const isBudget = course.type === 'budget';
  const buildingInfo = BUILDINGS.find((b) => b.id === course.building);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-in fade-in" />

      <div
        className="relative bg-white w-full md:max-w-3xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto scroll-soft rounded-t-3xl md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 ring-1 ring-border hover:bg-muted"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Обложка */}
        {course.image && (
          <div className="relative aspect-[2/1] w-full overflow-hidden md:rounded-t-3xl">
            <img
              src={course.image}
              alt={course.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                style={{ backgroundColor: dir.color, color: '#fff' }}
              >
                {dir.icon} {dir.label}
              </span>
              {isBudget ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-turquoise text-white px-3 py-1 text-xs font-bold">
                  <Gift className="h-3 w-3" /> Бюджетная программа
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange text-white px-3 py-1 text-xs font-bold">
                  <Wallet className="h-3 w-3" /> Платная программа
                </span>
              )}
            </div>
            <div className="absolute bottom-4 left-5 right-16">
              <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-md">
                {course.name}
              </h2>
            </div>
          </div>
        )}

        {/* Header карточки (если нет обложки) */}
        {!course.image && (
          <div className="relative bg-gradient-to-br from-turquoise/10 via-white to-orange/10 px-5 md:px-7 pt-5 md:pt-7 pb-5">
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                style={{ backgroundColor: `${dir.color}20`, color: dir.color }}
              >
                {dir.icon} {dir.label}
              </span>
              {isBudget ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-turquoise text-white px-3 py-1 text-xs font-bold">
                  <Gift className="h-3 w-3" /> Бюджетная программа
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange text-white px-3 py-1 text-xs font-bold">
                  <Wallet className="h-3 w-3" /> Платная программа
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-ink leading-tight pr-12">
              {course.name}
            </h2>
          </div>
        )}

        {/* Тело модалки */}
        <div className="p-5 md:p-7 pt-3 space-y-5">
          {/* Цена + возраст + корпус */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="bg-muted rounded-2xl p-3 md:p-4">
              <p className="text-xs text-muted-foreground">Стоимость</p>
              <p className={`text-sm md:text-lg font-extrabold ${isBudget ? 'text-turquoise' : 'text-ink'}`}>
                {course.price || (isBudget ? 'Бесплатно' : 'По запросу')}
              </p>
            </div>
            <div className="bg-muted rounded-2xl p-3 md:p-4">
              <p className="text-xs text-muted-foreground">Возраст</p>
              <p className="text-sm md:text-lg font-extrabold text-ink">
                {course.ageLabel || `${course.ageMin}–${course.ageMax} лет`}
              </p>
            </div>
            <div className="bg-muted rounded-2xl p-3 md:p-4">
              <p className="text-xs text-muted-foreground">Корпус</p>
              <p className="text-sm md:text-lg font-extrabold text-ink">
                {course.building}
              </p>
            </div>
          </div>

          {/* Расписание */}
          <div className="bg-white ring-1 ring-border rounded-2xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-turquoise/10 text-turquoise flex-shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Расписание занятий</p>
                <p className="text-sm md:text-base font-semibold text-ink mt-1 whitespace-pre-line">{course.schedule}</p>
              </div>
            </div>
            {course.cabinet && (
              <div className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                <span className="font-bold text-ink">Кабинет:</span> {course.cabinet}
              </div>
            )}
            {course.address && (
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-bold text-ink">Адрес:</span> {course.address}
              </div>
            )}
          </div>

          {/* Описание */}
          <div>
            <h3 className="text-lg font-extrabold text-ink mb-2">О программе</h3>
            <p className="text-base text-ink/80 leading-relaxed whitespace-pre-line">
              {course.description || course.shortDescription}
            </p>
          </div>

          {/* Видео-открытка */}
          {course.videoUrl && <VkVideoEmbed url={course.videoUrl} teacher={course.teacher} />}

          {/* Преподаватель */}
          <div className="bg-gradient-to-br from-[#FFF8F1] to-white ring-1 ring-orange/20 rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-dark mb-3">Педагог</p>
            <div className="flex items-start gap-4">
              {course.teacherPhoto && (
                <img
                  src={course.teacherPhoto}
                  alt={course.teacher}
                  className="h-16 w-16 md:h-20 md:w-20 rounded-2xl object-cover ring-2 ring-white shadow-md flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-lg md:text-xl font-extrabold text-ink">{course.teacher}</p>
                {course.teacherInfo && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{course.teacherInfo}</p>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <a
              href={course.mosruLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-turquoise px-6 py-4 text-base font-bold text-white shadow-lg shadow-turquoise/30 hover:scale-[1.02] transition-transform"
            >
              Записаться на mos.ru
              <ArrowRight className="h-5 w-5" />
            </a>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-turquoise" />
              Запись через единый портал госуслуг Москвы
              {course.mosruCode && <span className="text-muted-foreground/60">· код {course.mosruCode}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================
// VK Видео embed
// ===========================
function VkVideoEmbed({ url, teacher }: { url: string; teacher: string }) {
  let src = url;
  if (url.includes('vk.com/video') && !url.includes('video_ext.php')) {
    const m = url.match(/video(-?\d+)_(\d+)/);
    if (m) {
      const oid = m[1];
      const id = m[2];
      src = `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=2&autoplay=0`;
    }
  }

  return (
    <div>
      <h3 className="text-lg font-extrabold text-ink mb-2 flex items-center gap-2">
        <Video className="h-5 w-5 text-turquoise" />
        Видео-открытка от преподавателя
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {teacher} лично рассказывает о программе.
      </p>
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden ring-1 ring-border bg-ink">
        <iframe
          src={src}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          allowFullScreen
          frameBorder="0"
          className="absolute inset-0 h-full w-full"
          title={`Видео-открытка от ${teacher}`}
          loading="lazy"
        />
      </div>
    </div>
  );
}

// ===========================
// Склонение по числу
// ===========================
function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
