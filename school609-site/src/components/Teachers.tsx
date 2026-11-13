'use client';

import { ArrowRight, Star, User } from 'lucide-react';
import { Course, DIRECTION_LABELS } from '@/lib/courses';

export default function Teachers({ courses }: { courses: Course[] }) {
  // Уникальные педагоги (по ФИО) с количеством кружков и направлений
  const teacherMap = new Map<string, { teacher: string; directions: Set<string>; courses: string[] }>();

  courses.forEach((c) => {
    if (!c.teacher || c.teacher === 'Преподаватель школы №609') return;
    // На каждое ФИО — отдельный преподаватель. Но ФИО могут быть "Иванов И.И., Петров П.П."
    // Разделяем по запятой
    const teachers = c.teacher.split(',').map(t => t.trim()).filter(Boolean);
    teachers.forEach((t) => {
      if (!teacherMap.has(t)) {
        teacherMap.set(t, { teacher: t, directions: new Set(), courses: [] });
      }
      const entry = teacherMap.get(t)!;
      entry.directions.add(c.direction);
      if (entry.courses.length < 3) entry.courses.push(c.name);
    });
  });

  const teachers = Array.from(teacherMap.values())
    .sort((a, b) => b.courses.length - a.courses.length)
    .slice(0, 8);

  return (
    <section id="teachers" className="py-14 md:py-20 bg-gradient-to-b from-white to-[#FFF8F1]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-1.5 text-xs font-bold text-orange-dark">
            <Star className="h-3.5 w-3.5 fill-current" /> Наши педагоги
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink">
            За каждым кружком стоит опытный педагог
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            Учителя школы №609 — действующие специалисты с регалиями, призёры конкурсов, авторы методик.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {teachers.map((t, i) => {
            const dir = DIRECTION_LABELS[Array.from(t.directions)[0] as keyof typeof DIRECTION_LABELS] || DIRECTION_LABELS.social;
            const initials = t.teacher.split(' ').map(s => s[0]).slice(0, 2).join('');
            return (
              <article
                key={i}
                className="group bg-white rounded-3xl p-5 ring-1 ring-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-2xl text-xl font-extrabold text-white flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${dir.color}, ${DIRECTION_LABELS.creative.color})` }}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-ink text-base leading-tight">{t.teacher}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t.courses.length} {pluralize(t.courses.length, 'кружок', 'кружка', 'кружков')}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {Array.from(t.directions).slice(0, 3).map((d) => {
                    const info = DIRECTION_LABELS[d as keyof typeof DIRECTION_LABELS];
                    return (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: `${info.color}15`, color: info.color }}
                      >
                        {info.icon} {info.label}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Ведёт: {t.courses.slice(0, 2).join(', ')}
                  {t.courses.length > 2 && '…'}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#courses"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-bold text-white hover:scale-[1.02] transition-transform"
          >
            Выбрать кружок и педагога
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
