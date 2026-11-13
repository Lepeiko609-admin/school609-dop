import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/googleSheets';

// GET /api/courses — возвращает список кружков из Google Sheets (или демо-данные)
export async function GET() {
  try {
    const courses = await getCourses();
    return NextResponse.json({ ok: true, count: courses.length, courses }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    console.error('[/api/courses]', err);
    return NextResponse.json({ ok: false, error: 'Не удалось загрузить кружки' }, { status: 500 });
  }
}
