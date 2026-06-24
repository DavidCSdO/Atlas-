import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import configPromise from "@payload-config";
import { getPayload } from "payload";

export const metadata: Metadata = {
  title: "Atlas Capital | Planejamento Financeiro de Alta Qualidade",
  description: "Ajudamos pessoas a organizar seu patrimônio, investir com inteligência e construir independência financeira.",
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({ config: configPromise });
  const settings = await payload.findGlobal({
    slug: 'settings',
  });

  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-text">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
