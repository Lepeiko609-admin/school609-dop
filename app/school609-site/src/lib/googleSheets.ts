// Загрузчик кружков — v2.
// Приоритет:
// 1. .env GOOGLE_SHEETS_CSV_URL — опубликованная Google Таблица (CSV)
// 2. /public/courses.json — локальный JSON, сгенерированный из xlsx
// 3. SAMPLE_COURSES — fallback

import { Course, SAMPLE_COURSES } from './courses';
import { promises as fs } from 'fs';
import path from 'path';

const CACHE_TTL_MS = 5 * 60 * 1000;
let cached: { data: Course[]; at: number } | null = null;

const HEADER_MAP: Record<string, keyof Course> = {
  'id': 'id', 'название': 'name', 'name': 'name',
  'короткоеописание': 'shortDescription', 'shortdescription': 'shortDescription',
  'описание': 'description', 'description': 'description',
  'тип': 'type', 'type': 'type',
  'направление(ключ)': 'direction', 'направление': 'direction', 'direction': 'direction',
  'направленность(текст)': 'directionLabel', 'направленность': 'directionLabel', 'directionlabel': 'directionLabel',
  'корпус': 'building', 'building': 'building',
  'возрастот': 'ageMin', 'agemin': 'ageMin',
  'возрастдо': 'ageMax', 'agemax': 'ageMax',
  'возраст(текст)': 'ageLabel', 'возраст': 'ageLabel', 'agelabel': 'ageLabel',
  'возрастнаягруппа': 'ageGroup', 'agegroup': 'ageGroup',
  'преподаватель': 'teacher', 'teacher': 'teacher',
  'регалии(опыт,награды)': 'teacherInfo', 'регалии': 'teacherInfo', 'teacherinfo': 'teacherInfo',
  'фотопреподавателя(url)': 'teacherPhoto', 'фотопреподавателя': 'teacherPhoto', 'teacherphoto': 'teacherPhoto',
  'расписание': 'schedule', 'schedule': 'schedule',
  'видео(urlvk)': 'videoUrl', 'видео': 'videoUrl', 'videourl': 'videoUrl',
  'ссылканаmos.ru': 'mosruLink', 'ссылкаmosru': 'mosruLink', 'mosrulink': 'mosruLink',
  'коднаmos.ru': 'mosruCode', 'кодmosru': 'mosruCode', 'mosrucode': 'mosruCode',
  'стоимость': 'price', 'цена': 'price', 'price': 'price',
  'кабинет': 'cabinet', 'cabinet': 'cabinet',
  'адрес(длямероприятий)': 'address', 'адрес': 'address', 'address': 'address',
  'обложка(urlкартинки)': 'image', 'обложка': 'image', 'image': 'image',
  'осталосьмест': 'seatsLeft', 'seatsleft': 'seatsLeft',
  'рекомендуемый(да/нет)': 'highlight', 'рекомендуемый': 'highlight', 'highlight': 'highlight',
  'мероприятие(да/нет)': 'isEvent', 'мероприятие': 'isEvent', 'isevent': 'isEvent',
  'взрослые(да/нет)': 'isAdult', 'взрослые': 'isAdult', 'isadult': 'isAdult',
};

function normalizeKey(k: string): string {
  return k
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')           // убрать все пробелы
    .replace(/ё/g, 'е');           // ё → е
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else { field += c; }
    } else {
      if (c === '"') { inQuotes = true; }
      else if (c === ',') { cur.push(field); field = ''; }
      else if (c === '\n') { cur.push(field); rows.push(cur); cur = []; field = ''; }
      else if (c === '\r') { /* skip */ }
      else { field += c; }
    }
  }
  if (field.length || cur.length) { cur.push(field); rows.push(cur); }
  return rows.filter(r => r.length > 1 || (r.length === 1 && r[0] !== ''));
}

function rowToCourse(headers: string[], row: string[], idx: number): Course | null {
  const obj: Record<string, string> = {};
  headers.forEach((h, i) => {
    const key = HEADER_MAP[normalizeKey(h)] || normalizeKey(h);
    obj[key] = row[i] || '';
  });

  if (!obj.name) return null;

  const type: Course['type'] = (obj.type?.toLowerCase().startsWith('paid') || obj.type?.toLowerCase().startsWith('вне') || obj.type?.toLowerCase().startsWith('плат'))
    ? 'paid' : 'budget';

  const validDirections: Course['direction'][] = ['sport', 'creative', 'tech', 'science', 'social'];
  const direction = (validDirections as string[]).includes(obj.direction?.toLowerCase()) ? obj.direction as Course['direction'] : 'social';

  const validGroups: Course['ageGroup'][] = ['preschool', 'primary', 'middle', 'high', 'adult', 'all'];
  const ageGroup = (validGroups as string[]).includes(obj.ageGroup?.toLowerCase()) ? obj.ageGroup as Course['ageGroup'] : 'all';

  const seatsLeft = obj.seatsLeft ? parseInt(obj.seatsLeft, 10) : undefined;
  const highlight = obj.highlight ? ['да', 'true', '1', 'yes', 'y'].includes(obj.highlight.toLowerCase().trim()) : false;
  const isEvent = obj.isEvent ? ['да', 'true', '1', 'yes', 'y'].includes(obj.isEvent.toLowerCase().trim()) : false;
  const isAdult = obj.isAdult ? ['да', 'true', '1', 'yes', 'y'].includes(obj.isAdult.toLowerCase().trim()) : false;

  return {
    id: obj.id || `course-${idx}`,
    name: obj.name,
    shortDescription: obj.shortDescription || '',
    description: obj.description || obj.shortDescription || obj.name,
    type,
    direction,
    directionLabel: obj.directionLabel || '',
    building: obj.building || '341А',
    ageMin: obj.ageMin ? parseInt(obj.ageMin, 10) : null,
    ageMax: obj.ageMax ? parseInt(obj.ageMax, 10) : null,
    ageLabel: obj.ageLabel || '',
    ageGroup,
    teacher: obj.teacher || 'Преподаватель школы №609',
    teacherInfo: obj.teacherInfo || undefined,
    teacherPhoto: obj.teacherPhoto || undefined,
    schedule: obj.schedule || 'По расписанию',
    videoUrl: obj.videoUrl || undefined,
    mosruLink: obj.mosruLink || 'https://www.mos.ru/pgu/ru/application/link/22970/',
    mosruCode: obj.mosruCode || undefined,
    price: obj.price || (type === 'budget' ? 'Бесплатно' : ''),
    cabinet: obj.cabinet || undefined,
    address: obj.address || undefined,
    image: obj.image || undefined,
    seatsLeft: Number.isFinite(seatsLeft) ? seatsLeft : undefined,
    highlight,
    isEvent,
    isAdult,
  };
}

export async function getCourses(): Promise<Course[]> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.data;
  }

  // 1) Пытаемся Google Sheets CSV (если задан env)
  const url = process.env.GOOGLE_SHEETS_CSV_URL;
  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 300 }, headers: { 'Cache-Control': 'no-cache' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const rows = parseCSV(text);
      if (rows.length < 2) throw new Error('empty sheet');
      const headers = rows[0];
      const courses: Course[] = [];
      rows.slice(1).forEach((r, i) => {
        const c = rowToCourse(headers, r, i);
        if (c) courses.push(c);
      });
      if (courses.length > 0) {
        cached = { data: courses, at: Date.now() };
        return cached.data;
      }
      throw new Error('no rows parsed');
    } catch (err) {
      console.error('[googleSheets] fallback to local JSON:', err);
    }
  }

  // 2) Читаем локальный /public/courses.json напрямую с диска (надёжнее в Next.js)
  try {
    const filePath = path.join(process.cwd(), 'public', 'courses.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    if (data?.courses?.length) {
      cached = { data: data.courses as Course[], at: Date.now() };
      return cached.data;
    }
  } catch (err) {
    console.error('[localJSON] fallback to sample:', err);
  }

  // 3) Fallback на демо-данные
  cached = { data: SAMPLE_COURSES, at: Date.now() };
  return cached.data;
}
