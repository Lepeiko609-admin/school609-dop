// Типы данных кружков — v2 (соответствует структуре из xlsx)

export type CourseType = 'budget' | 'paid';
export type Direction = 'sport' | 'creative' | 'tech' | 'science' | 'social';
export type AgeGroup = 'preschool' | 'primary' | 'middle' | 'high' | 'adult' | 'all';
export type Building = '312' | '314' | '330' | '336А' | '341А';

export interface Course {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  type: CourseType;
  direction: Direction;
  directionLabel: string;
  building: Building | string;
  ageMin: number | null;
  ageMax: number | null;
  ageLabel: string;
  ageGroup: AgeGroup;
  teacher: string;
  teacherInfo?: string;
  teacherPhoto?: string | null;
  schedule: string;
  videoUrl?: string | null;
  mosruLink: string;
  mosruCode?: string;
  price: string;
  cabinet?: string;
  address?: string;
  image?: string | null;
  seatsLeft?: number | null;
  highlight?: boolean;
  isEvent?: boolean;
  isAdult?: boolean;
}

export const DIRECTION_LABELS: Record<Direction, { label: string; icon: string; color: string }> = {
  sport:    { label: 'Спорт',                icon: '⚽', color: '#FF8A3D' },
  creative: { label: 'Творчество',           icon: '🎨', color: '#FF6B6B' },
  tech:     { label: 'Техника',              icon: '🔧', color: '#0FB5B5' },
  science:  { label: 'Наука',                icon: '🔬', color: '#5FC9C9' },
  social:   { label: 'Социально-гуманитарное', icon: '🧠', color: '#E66A1F' },
};

export const DIRECTION_FROM_LABEL: Record<string, Direction> = {
  'Физкультурно-спортивная': 'sport',
  'Художественная': 'creative',
  'Техническая': 'tech',
  'Естественнонаучная': 'science',
  'Социально-гуманитарная': 'social',
};

export const AGE_GROUPS: { id: AgeGroup; label: string; shortLabel: string; icon: string; desc: string }[] = [
  { id: 'preschool', label: 'Дошкольники',   shortLabel: '2–7 лет',  icon: '🧸', desc: 'Кружки для самых маленьких — от 2 до 7 лет' },
  { id: 'primary',   label: 'Младшая школа', shortLabel: '7–11 лет', icon: '✏️', desc: '1–4 классы, начальная школа' },
  { id: 'middle',    label: 'Средняя школа', shortLabel: '11–14 лет', icon: '📘', desc: '5–7 классы, среднее звено' },
  { id: 'high',      label: 'Старшая школа', shortLabel: '14–17 лет', icon: '🎓', desc: '8–11 классы, подготовка к ОГЭ/ЕГЭ' },
  { id: 'adult',     label: 'Взрослые',      shortLabel: '18+',     icon: '💪', desc: 'Спорт и активность для взрослых' },
  { id: 'all',       label: 'Все возраста',  shortLabel: 'Все',     icon: '✨', desc: 'Показать все кружки без фильтра по возрасту' },
];

export const BUILDINGS: { id: string; label: string; address: string; isCenter?: boolean; description: string }[] = [
  { id: '341А', label: 'Корпус 341А', address: 'Центр доп. образования', isCenter: true, description: 'Неучебный корпус — центр дополнительного образования школы №609' },
  { id: '312',  label: 'Корпус 312',  address: 'Дошкольное отделение', description: 'Дошкольные кружки и секции' },
  { id: '314',  label: 'Корпус 314',  address: 'Учебный корпус', description: 'Основная школа, 1–11 классы' },
  { id: '330',  label: 'Корпус 330',  address: 'Учебный корпус', description: 'Основная школа, 1–11 классы' },
  { id: '336А', label: 'Корпус 336А', address: 'Дошкольное отделение', description: 'Дошкольные кружки и секции' },
];

export const SCHOOL_CONTACTS = {
  name: 'Школа №609',
  center: 'Центр дополнительного образования — корпус 341А',
  phone: '+7 (495) 000-00-00',
  email: 'dop@school609.ru',
  address: 'г. Москва, корпус 341А — центр доп. образования',
  hours: 'Пн–Пт 9:00–20:00, Сб 10:00–18:00',
  vk: 'https://vk.com/school609',
  telegram: 'https://t.me/school609',
};

// Демонстрационные данные (fallback, если /courses.json недоступен)
export const SAMPLE_COURSES: Course[] = [
  {
    id: 'demo-1',
    name: 'Робототехника LEGO WeDo',
    shortDescription: 'Конструируем и программируем умных роботов. 7–11 лет.',
    description: 'Программа «Робототехника LEGO WeDo» знакомит детей с основами механики и программирования.',
    type: 'paid',
    direction: 'tech',
    directionLabel: 'Техническая',
    building: '341А',
    ageMin: 7,
    ageMax: 11,
    ageLabel: '7–11 лет',
    ageGroup: 'primary',
    teacher: 'Сергеев Артём Дмитриевич',
    schedule: 'Пн, Ср 16:00–17:30',
    mosruLink: 'https://www.mos.ru/pgu/ru/application/link/22970/',
    price: '4 500 ₽/мес',
  },
];
