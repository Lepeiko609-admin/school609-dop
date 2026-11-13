'use client';

import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { SCHOOL_CONTACTS } from '@/lib/courses';

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          {/* Бренд */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-turquoise to-turquoise-dark text-white font-extrabold text-lg">
                609
              </div>
              <div>
                <p className="text-base font-extrabold">Школа №609</p>
                <p className="text-xs text-white/60">Дополнительное образование</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Помогаем родителям и детям выбрать кружок, который действительно увлечёт. Корпус 341А — центр дополнительного образования.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SCHOOL_CONTACTS.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-turquoise transition-colors"
                aria-label="VK"
              >
                <span className="font-extrabold text-sm">VK</span>
              </a>
              <a
                href={SCHOOL_CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-turquoise transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div className="md:col-span-4">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
              Центр дополнительного образования
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-turquoise flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">{SCHOOL_CONTACTS.center}</p>
                  <p className="text-sm text-white/70 mt-0.5">{SCHOOL_CONTACTS.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-turquoise flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Режим работы</p>
                  <p className="text-sm text-white/70 mt-0.5">{SCHOOL_CONTACTS.hours}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-turquoise flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${SCHOOL_CONTACTS.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-bold hover:text-turquoise">
                    {SCHOOL_CONTACTS.phone}
                  </a>
                  <p className="text-sm text-white/70 mt-0.5">Секретарь центра</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-turquoise flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`mailto:${SCHOOL_CONTACTS.email}`} className="text-sm font-bold hover:text-turquoise">
                    {SCHOOL_CONTACTS.email}
                  </a>
                  <p className="text-sm text-white/70 mt-0.5">Вопросы по доп. образованию</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Навигация */}
          <div className="md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">Разделы</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#courses" className="text-white/80 hover:text-turquoise">Каталог</a></li>
              <li><a href="#teachers" className="text-white/80 hover:text-turquoise">Педагоги</a></li>
              <li><a href="#how-to" className="text-white/80 hover:text-turquoise">Как записаться</a></li>
              <li><a href="#about" className="text-white/80 hover:text-turquoise">О центре</a></li>
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">Запись</p>
            <a
              href="https://www.mos.ru/pgu/ru/application/link/22970/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-turquoise px-5 py-3 text-sm font-bold hover:scale-105 transition-transform"
            >
              mos.ru
              <MessageCircle className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-white/50 leading-relaxed">
              Запись на все бюджетные и платные кружки — через единый портал госуслуг Москвы.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {SCHOOL_CONTACTS.name}. Все права защищены.
          </p>
          <p className="text-xs text-white/50">
            Сайт работает на Next.js, данные — Google Sheets. Сделано с заботой о детях.
          </p>
        </div>
      </div>
    </footer>
  );
}
