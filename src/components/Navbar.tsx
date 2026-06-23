'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { ChevronDown, Hexagon, TrendingUp, Landmark, LineChart, ShieldCheck, Briefcase, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { title: 'Planejamento Financeiro', desc: 'Estruture seu orçamento e quite dívidas.', icon: <Landmark className="w-5 h-5 text-primary" /> },
    { title: 'Gestão de Investimentos', desc: 'Carteiras sob medida para o seu perfil.', icon: <TrendingUp className="w-5 h-5 text-primary" /> },
    { title: 'Previdência Privada', desc: 'Garantia e conforto para o seu futuro.', icon: <LineChart className="w-5 h-5 text-primary" /> },
    { title: 'Proteção Patrimonial', desc: 'Blindagem e planejamento sucessório.', icon: <ShieldCheck className="w-5 h-5 text-primary" /> },
    { title: 'Soluções Corporativas', desc: 'Gestão de caixa e benefícios.', icon: <Briefcase className="w-5 h-5 text-primary" /> },
    { title: 'Wealth Management', desc: 'Soluções exclusivas para alta renda.', icon: <HeartHandshake className="w-5 h-5 text-primary" /> },
  ];

  return (
    <div className={`fixed left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ${isScrolled ? 'top-2' : 'top-1'}`}>
      <header className={`pointer-events-auto flex items-center justify-between p-2 pl-4 rounded-[24px] transition-all duration-500 gap-6 md:gap-12 ${isScrolled
        ? 'bg-[#ffffff]/5 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-3xl'
        : 'bg-[#0a0f1c]/90 border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl'
        }`}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-background shadow-lg transition-transform group-hover:scale-105">
            <Hexagon className="w-5 h-5 fill-background" />
          </div>
          <span className="text-lg font-bold tracking-tight text-text hidden sm:block">Atlas</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">

          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('servicos')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeMenu === 'servicos' ? 'bg-white/10 text-text' : 'text-muted hover:bg-white/5 hover:text-text'}`}>
              Serviços
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'servicos' ? 'rotate-180 text-primary' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMenu === 'servicos' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[800px] pointer-events-auto"
                >
                  <div className="bg-[#0b1021] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] rounded-3xl p-8 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                    <span className="text-xs font-bold tracking-widest text-primary uppercase mb-6 block">Nossas Especialidades</span>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      {services.map((item, idx) => (
                        <Link key={idx} href="/servicos" className="flex flex-col gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                          {item.icon}
                          <h4 className="text-sm font-semibold text-text group-hover:text-primary transition-colors">{item.title}</h4>
                          <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <p className="text-sm text-muted">Ainda com dúvidas de qual é o ideal para você?</p>
                      <Link href="/contato" className="text-sm font-medium text-primary hover:underline">
                        Fale com um assessor &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/sobre" className="px-4 py-2 rounded-full text-sm font-medium text-muted hover:bg-white/5 hover:text-text transition-colors">
            Sobre
          </Link>
          <Link href="/simulador" className="px-4 py-2 rounded-full text-sm font-medium text-muted hover:bg-white/5 hover:text-text transition-colors">
            Simulador
          </Link>
          <Link href="/blog" className="px-4 py-2 rounded-full text-sm font-medium text-muted hover:bg-white/5 hover:text-text transition-colors">
            Blog
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center">
          <Link href="/contato">
            <Button variant="primary" className="rounded-full shadow-lg shadow-primary/20 font-semibold px-6 h-10 text-sm">
              Agendar Reunião
            </Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
