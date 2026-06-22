import React from 'react';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  // Placeholder data - in a real scenario this would be fetched from Payload CMS
  const posts = [
    {
      title: 'Como a queda da Selic impacta seus investimentos em Renda Fixa',
      slug: 'queda-da-selic-impacta-investimentos-renda-fixa',
      category: 'Renda Fixa',
      date: '10 Jun 2026',
      summary: 'Entenda os movimentos recentes do mercado e descubra como reposicionar sua carteira para continuar tendo bons rendimentos mesmo com a queda da taxa básica de juros.',
    },
    {
      title: 'Fundos Imobiliários ou Imóveis Físicos? Uma análise definitiva',
      slug: 'fundos-imobiliarios-ou-imoveis-fisicos',
      category: 'Educação Financeira',
      date: '25 Mai 2026',
      summary: 'Comparamos os custos, a liquidez, os impostos e o potencial de valorização dessas duas classes de ativos queridinhas dos brasileiros.',
    },
    {
      title: 'Por que o Planejamento Sucessório não é apenas para bilionários',
      slug: 'por-que-planejamento-sucessorio-nao-e-apenas-para-bilionarios',
      category: 'Proteção Patrimonial',
      date: '12 Mai 2026',
      summary: 'Entenda os custos invisíveis do inventário e como pequenas ações hoje podem garantir a paz e a segurança financeira da sua família no futuro.',
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-6 lg:px-8">
      <FadeIn className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Atlas</h1>
        <p className="text-lg text-muted">
          Artigos, análises de mercado e dicas de especialistas para você investir melhor e tomar decisões financeiras mais inteligentes.
        </p>
      </FadeIn>

      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-4 mb-12 justify-center overflow-x-auto pb-4">
        <span className="px-4 py-2 rounded-full bg-primary text-background font-medium whitespace-nowrap cursor-pointer">Todos</span>
        <span className="px-4 py-2 rounded-full bg-surface text-text font-medium whitespace-nowrap cursor-pointer hover:bg-surface/80">Renda Fixa</span>
        <span className="px-4 py-2 rounded-full bg-surface text-text font-medium whitespace-nowrap cursor-pointer hover:bg-surface/80">Ações</span>
        <span className="px-4 py-2 rounded-full bg-surface text-text font-medium whitespace-nowrap cursor-pointer hover:bg-surface/80">Educação Financeira</span>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {posts.map((post, i) => (
          <StaggerItem key={i}>
            <Link href={`/blog/${post.slug}`}>
              <Card className="h-full flex flex-col cursor-pointer group">
                <div className="flex items-center gap-4 mb-4 text-sm text-muted">
                  <span className="px-3 py-1 rounded bg-secondary/10 text-secondary">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted flex-grow mb-6 line-clamp-3">
                  {post.summary}
                </p>
                <div className="mt-auto flex items-center text-primary font-medium group-hover:underline">
                  Ler artigo <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
