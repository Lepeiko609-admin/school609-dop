'use client';

import { Building2, GraduationCap, Gift, Wallet, MapPin, Sparkles } from 'lucide-react';
import { BUILDINGS } from '@/lib/courses';

export default function AboutCenter() {
  return (
    <section id="about" className="py-14 md:py-20 bg-gradient-to-b from-[#FFF8F1] to-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Левая колонка — текст */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-turquoise/10 px-4 py-1.5 text-xs font-bold text-turquoise-dark">
              <Building2 className="h-3.5 w-3.5" /> 5 корпусов
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink">
              Корпуса школы №609
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <b className="text-ink">Корпус 341А</b> — неучебный корпус, центр дополнительного образования. Здесь нет школьных звонков, царит творческая атмосфера и проходят занятия по робототехнике, авиамоделированию, спортивным единоборствам, кулинарии и многому другому.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 ring-1 ring-border">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-turquoise" />
                  <p className="font-bold text-ink text-sm">Бюджетные кружки</p>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Бесплатные программы по направлениям спорт, творчество, наука, гимнастика. Финансирует Департамент образования Москвы.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 ring-1 ring-border">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-orange" />
                  <p className="font-bold text-ink text-sm">Внебюджетные</p>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Платные программы с уникальными преподавателями и оборудованием. Часто — первое занятие бесплатно.
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка — список корпусов */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-turquoise/15 to-orange/15 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl p-5 md:p-7 ring-1 ring-border shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-turquoise text-white font-extrabold text-lg shadow-md">
                    <Building2 className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Структура школы</p>
                    <p className="text-xl font-extrabold text-ink">5 корпусов</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {BUILDINGS.map((b) => (
                    <div
                      key={b.id}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                        b.isCenter
                          ? 'bg-turquoise/10 ring-1 ring-turquoise/30'
                          : 'bg-muted hover:bg-turquoise/5'
                      }`}
                    >
                      <div
                        className={`grid h-12 w-12 place-items-center rounded-xl font-extrabold text-base flex-shrink-0 ${
                          b.isCenter ? 'bg-turquoise text-white' : 'bg-white text-ink ring-1 ring-border'
                        }`}
                      >
                        {b.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold flex items-center gap-1 ${b.isCenter ? 'text-turquoise-dark' : 'text-ink'}`}>
                          {b.label}
                          {b.isCenter && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-turquoise text-white px-2 py-0.5 text-xs font-bold">
                              <Sparkles className="h-3 w-3" /> Центр
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.address}</p>
                        <p className="text-xs text-muted-foreground/80 mt-0.5">{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
