'use client';

import { ArrowRight, MousePointerClick, FileText, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    icon: MousePointerClick,
    n: '01',
    title: 'Выберите кружок',
    text: 'Изучите каталог, прочитайте описание и посмотрите видео-открытку от преподавателя.',
    color: '#0FB5B5',
  },
  {
    icon: ArrowRight,
    n: '02',
    title: 'Нажмите «Записаться на mos.ru»',
    text: 'Вы перейдёте на единый портал госуслуг Москвы. Авторизуйтесь через mos.ru или Госуслуги.',
    color: '#FF8A3D',
  },
  {
    icon: FileText,
    n: '03',
    title: 'Заполните заявку',
    text: 'Укажите ребёнка, класс и корпус. Заявка уходит администрации школы автоматически.',
    color: '#5FC9C9',
  },
  {
    icon: CheckCircle2,
    n: '04',
    title: 'Получите подтверждение',
    text: 'В течение 1–3 рабочих дней придёт приглашение на первое занятие и контакты педагога.',
    color: '#E66A1F',
  },
];

export default function HowToEnroll() {
  return (
    <section id="how-to" className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-xs font-bold text-turquoise-dark">
            <MousePointerClick className="h-3.5 w-3.5" /> 4 простых шага
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink">
            Как записаться в кружок
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            Запись проходит полностью онлайн через единый портал госуслуг Москвы. Это быстро и бесплатно.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative">
                <div className="bg-white rounded-3xl p-5 md:p-6 ring-1 ring-border shadow-sm h-full">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-2xl mb-4"
                    style={{ backgroundColor: `${s.color}15`, color: s.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-xs font-bold text-muted-foreground/70 mb-1.5">ШАГ {s.n}</div>
                  <h3 className="text-lg font-extrabold text-ink mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-turquoise/40">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA-полоса */}
        <div className="mt-10 md:mt-14 bg-gradient-to-br from-[#0FB5B5] to-[#0A8A8A] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 h-48 w-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 h-32 w-32 bg-[#FFB370]/30 rounded-full blur-3xl translate-y-1/2" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Запишитесь прямо сейчас
              </h3>
              <p className="mt-2 text-white/85 text-base md:text-lg max-w-md">
                Запись 2026–2027 открыта. Бюджетные места заполняются быстро, на платных — первое занятие бесплатно.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink px-7 py-4 text-base font-bold hover:scale-[1.02] transition-transform"
              >
                В каталог кружков
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="https://www.mos.ru/pgu/ru/application/link/22970/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-md text-white ring-1 ring-white/30 px-7 py-4 text-base font-bold hover:bg-white/20 transition"
              >
                Открыть mos.ru
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
