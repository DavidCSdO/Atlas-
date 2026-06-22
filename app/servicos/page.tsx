import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Landmark, LineChart, Briefcase, HeartHandshake } from 'lucide-react';

export default function ServicosPage() {
  const servicos = [
    {
      titulo: 'Planejamento Financeiro',
      desc: 'Um raio-X completo da sua vida financeira para estruturar orçamentos, quitar dívidas e criar um fundo de emergência robusto.',
      icon: <Landmark className="w-8 h-8 text-primary" />
    },
    {
      titulo: 'Gestão de Investimentos',
      desc: 'Montamos carteiras personalizadas e resilientes, ajustadas ao seu perfil de risco e aos seus objetivos de curto, médio e longo prazo.',
      icon: <TrendingUp className="w-8 h-8 text-primary" />
    },
    {
      titulo: 'Previdência Privada',
      desc: 'Estratégias inteligentes com benefícios fiscais para garantir que o seu padrão de vida se mantenha no futuro.',
      icon: <LineChart className="w-8 h-8 text-primary" />
    },
    {
      titulo: 'Proteção Patrimonial',
      desc: 'Blindagem do seu patrimônio contra imprevistos através de seguros sob medida e planejamento sucessório.',
      icon: <ShieldCheck className="w-8 h-8 text-primary" />
    },
    {
      titulo: 'Soluções Corporativas',
      desc: 'Para empresas e empresários: gestão de caixa, sucessão empresarial e benefícios corporativos estruturados.',
      icon: <Briefcase className="w-8 h-8 text-primary" />
    },
    {
      titulo: 'Wealth Management',
      desc: 'Para clientes de alta renda: soluções exclusivas, fundos fechados, investimentos no exterior e consolidação de portfólio.',
      icon: <HeartHandshake className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] py-16 px-6 lg:px-8">
      <FadeIn className="text-center max-w-3xl mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Nossos Serviços</h1>
        <p className="text-lg md:text-xl text-muted">
          Não importa a fase da sua vida. Temos as soluções ideais para organizar, proteger e multiplicar o seu capital com segurança.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mb-24">
        {servicos.map((s, i) => (
          <StaggerItem key={i}>
            <Card className="h-full flex flex-col items-start p-8">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{s.titulo}</h3>
              <p className="text-muted flex-grow mb-8">{s.desc}</p>
              <Link href="/contato" className="mt-auto w-full">
                <Button variant="outline" className="w-full">Saber mais</Button>
              </Link>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn className="w-full max-w-5xl">
        <div className="rounded-2xl p-8 md:p-12 border border-primary/20 bg-gradient-to-r from-surface to-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ainda com dúvidas?</h2>
            <p className="text-muted">Fale com um de nossos assessores e descubra a melhor estratégia para o seu momento.</p>
          </div>
          <Link href="/contato" className="shrink-0">
            <Button size="lg">Agendar Reunião Gratuita</Button>
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
