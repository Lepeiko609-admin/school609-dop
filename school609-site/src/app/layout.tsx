import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Школа 609 — Дополнительное образование | Кружки для детей и взрослых",
  description: "Более 40 кружков и секций в школе №609: бюджетные и платные программы для детей 5-17 лет. Творчество, спорт, IT, языки, наука. Корпус 341А — центр дополнительного образования. Запись на mos.ru.",
  keywords: ["кружки", "дополнительное образование", "школа 609", "секция", "творчество", "спорт", "IT", "языки", " mos.ru", "запись в школу"],
  authors: [{ name: "Школа №609" }],
  openGraph: {
    title: "Школа 609 — Дополнительное образование",
    description: "40+ кружков для детей и взрослых. Запись на mos.ru.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
