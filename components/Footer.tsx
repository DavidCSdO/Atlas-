'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { Hexagon } from 'lucide-react';

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-background shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-text">Atlas Capital</span>
            </Link>
            <p className="text-muted max-w-sm">
              Ajudamos você a organizar seu patrimônio, investir com inteligência e construir independência financeira.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-6">Navegação</h3>
            <ul className="space-y-4">
              <li><Link href="/sobre" className="text-muted hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link href="/servicos" className="text-muted hover:text-primary transition-colors">Nossos Serviços</Link></li>
              <li><Link href="/simulador" className="text-muted hover:text-primary transition-colors">Simulador de Investimentos</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-6">Contato</h3>
            <ul className="space-y-4 text-muted">
              <li>contato@atlascapital.com.br</li>
              <li>(11) 99999-9999</li>
              <li>Av. Faria Lima, 3477 - São Paulo, SP</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Atlas Capital. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {/* Social icons could go here */}
            <a href="#" className="text-muted hover:text-primary">LinkedIn</a>
            <a href="#" className="text-muted hover:text-primary">Instagram</a>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full flex justify-center items-end select-none pointer-events-auto border-t border-white/5 pt-10"
        style={{ minHeight: '300px' }}
      >
        <h1 className="text-[18vw] font-black leading-[0.8] text-white/[0.02] tracking-tighter m-0 p-0 text-center uppercase">
          ATLAS
        </h1>

        {/* Spotlight overlay */}
        <div
          className="absolute inset-0 flex justify-center items-end pointer-events-none pt-10"
          style={{
            WebkitMaskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 100%)`,
            maskImage: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 100%)`,
          }}
        >
          <h1 className="text-[18vw] font-black leading-[0.8] text-white/40 tracking-tighter m-0 p-0 text-center uppercase bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/10">
            ATLAS
          </h1>
        </div>
      </div>

    </footer>
  );
}
