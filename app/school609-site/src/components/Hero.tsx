'use client';

import { Sparkles, ArrowRight, Star, MapPin, Clock, Users, Building2, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-8 md:pt-12 pb-16 md:pb-24">
      {/* Декор: мягкие пятна */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0FB5B5]/20 blur-3xl animate-blob" />
        <div className="absolute top-32 -left-32 h-96 w-96 rounded-full bg-[#FF8A3D]/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-[#FFB370]/15 blur-3xl animate-blob" style={{ animationDelay: '8s' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Левая колонка — оффер */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm ring-1 ring-turquoise/20 px-4 py-1.5 text-xs md:text-sm font-bold text-turquoise">
              <Sparkles className="h-4 w-4" />
              Запись 2026–2027 открыта
            </div>

            <h1 className="mt-5 md:mt-7 font-extrabold text-ink tracking-tight text-[34px] leading-[1.05] md:text-[56px] md:leading-[1.03] lg:text-[64px]">
              Кружки, в которые
              <br className="hidden md:block" />
              <span className="text-gradient"> ребёнок ходит</span>
              <br className="hidden md:block" /> с удовольствием
            </h1>

            <p className="mt-5 md:mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              <b className="text-ink">100+ программ</b> в 5 корпусах школы №609 для детей <b className="text-ink">от 2 лет</b> и взрослых.
              От робототехники до самбо, от живописи до китайского языка. Бюджетные — бесплатно, платные — с пробным занятием.
            </p>

            {/* Буллеты преимуществ */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm">
              <span className="inline-flex items-center gap-1.5 text-ink/80 font-medium">
                <CheckCircle2 className="h-4 w-4 text-turquoise" /> Запись на mos.ru
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink/80 font-medium">
                <CheckCircle2 className="h-4 w-4 text-turquoise" /> 5 корпусов рядом
              </span>
              <span className="inline-flex items-center gap-1.5 text-ink/80 font-medium">
                <CheckCircle2 className="h-4 w-4 text-turquoise" /> Опытные педагоги
              </span>
            </div>

            <div className="mt-7 md:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#courses"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-turquoise px-7 py-4 text-base font-bold text-white shadow-lg shadow-turquoise/40 transition-transform hover:scale-[1.03] active:scale-100"
              >
                Выбрать кружок по возрасту
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how-to"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white ring-1 ring-border px-7 py-4 text-base font-bold text-ink transition-colors hover:bg-muted"
              >
                Как записаться
              </a>
            </div>

            {/* Мини-доказательство */}
            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 text-ink/80">
                <Users className="h-5 w-5 text-turquoise" />
                <span className="text-sm font-bold">500+ семей</span>
                <span className="text-sm text-muted-foreground">уже выбрали нас</span>
              </div>
              <div className="flex items-center gap-1 text-[#FFB400]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1 text-sm font-bold text-ink">4.9</span>
              </div>
            </div>
          </div>

          {/* Правая колонка — карточка-витрина */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -top-4 -left-4 hidden md:block">
                <div className="rounded-3xl bg-orange px-5 py-3 text-white shadow-xl rotate-[-6deg]">
                  <p className="text-xs font-bold opacity-90">Бюджет и платно</p>
                  <p className="text-lg font-extrabold leading-none">в одном месте</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 hidden md:block">
                <div className="rounded-3xl bg-turquoise px-5 py-3 text-white shadow-xl rotate-[6deg]">
                  <p className="text-xs font-bold opacity-90">Запись через</p>
                  <p className="text-lg font-extrabold leading-none">mos.ru</p>
                </div>
              </div>

              <div className="relative bg-white rounded-3xl shadow-[0_24px_60px_-20px_rgba(11,36,52,0.25)] p-5 md:p-6 ring-1 ring-border/60">
                <img
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80"
                  alt="Занятие робототехникой в школе 609"
                  className="w-full aspect-[4/3] object-cover rounded-2xl"
                />
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 text-orange-dark px-3 py-1 text-xs font-bold">
                    <Sparkles className="h-3.5 w-3.5" /> Хит сезона
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-turquoise/10 text-turquoise-dark px-3 py-1 text-xs font-bold">
                    <MapPin className="h-3.5 w-3.5" /> Корпус 341А
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-extrabold text-ink">
                  Робототехника и авиамоделирование
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Для будущих инженеров 7–17 лет. Корпус 341А — центр доп. образования.
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Стоимость</p>
                    <p className="font-extrabold text-ink">от 600 ₽/мес</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Расписание
                    </p>
                    <p className="font-bold text-ink text-sm">Пн, Ср, Пт</p>
                  </div>
                  <a
                    href="#courses"
                    className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white hover:scale-105 transition-transform"
                  >
                    Подробнее <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
