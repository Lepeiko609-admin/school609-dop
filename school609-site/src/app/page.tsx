import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Catalog from '@/components/Catalog';
import Teachers from '@/components/Teachers';
import HowToEnroll from '@/components/HowToEnroll';
import AboutCenter from '@/components/AboutCenter';
import Footer from '@/components/Footer';
import { getCourses } from '@/lib/googleSheets';

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats courses={courses} />
        <Catalog initialCourses={courses} />
        <Teachers courses={courses} />
        <HowToEnroll />
        <AboutCenter />
      </main>
      <Footer />
    </div>
  );
}
