import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Dummy props for Next.js 15 page structure
export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  return (
    <article className="flex flex-col items-center min-h-screen py-16 px-6 lg:px-8">
      <div className="w-full max-w-3xl mb-8">
        <Link href="/blog" className="inline-flex items-center text-muted hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Blog
        </Link>
      </div>

      <div className="w-full max-w-3xl text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6 text-sm text-muted">
          <span className="px-3 py-1 rounded bg-secondary/10 text-secondary">Mercado Financeiro</span>
          <span>10 Jun 2026</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          Entendendo o artigo: {slug}
        </h1>
        <p className="text-xl text-muted text-left mb-12 border-l-4 border-primary pl-4">
          Este é um artigo de exemplo gerado dinamicamente. No projeto final, o conteúdo será renderizado diretamente do Lexical Editor do Payload CMS.
        </p>
      </div>

      <div className="w-full max-w-3xl prose prose-invert prose-lg prose-p:text-muted prose-headings:text-text">
        <h2>O cenário atual</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <h3>Por que isso importa?</h3>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="my-12 p-8 rounded-xl bg-surface/50 border border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4 text-text mt-0">Gostou deste artigo?</h3>
          <p className="text-muted mb-6">Assine nossa newsletter para receber as melhores análises direto no seu email.</p>
          <div className="flex gap-4 justify-center">
            <input type="email" placeholder="Seu melhor email" className="flex h-11 rounded-md border border-white/10 bg-surface px-4 py-2 text-sm text-text focus:outline-none focus:border-primary w-full max-w-xs" />
            <Button>Assinar</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
