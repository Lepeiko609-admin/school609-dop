'use client';

import { Users, GraduationCap, Building2, Trophy } from 'lucide-react';
import { Course } from '@/lib/courses';

export default function Stats({ courses }: { courses: Course[] }) {
  const totalCourses = courses.length;
  const totalTeachers = new Set(courses.map(c => c.teacher)).size;
  const buildings = new Set(courses.map(c => c.building)).size;
  const budgetCount = courses.filter(c => c.type === 'budget').length;

  const STATS = [
    { icon: Users, value: `${totalCourses}+`, label: 'кружков и секций', color: '#0FB5B5' },
    { icon: GraduationCap, value: `${totalTeachers}`, label: 'опытных педагогов', color: '#FF8A3D' },
    { icon: Building2, value: `${buildings}`, label: 'корпусов школы', color: '#5FC9C9' },
    { icon: Trophy, value: `${budgetCount}+`, label: 'бесплатных программ', color: '#E66A1F' },
  ];

  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-4 md:p-6 ring-1 ring-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl mb-3"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 font-medium leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
