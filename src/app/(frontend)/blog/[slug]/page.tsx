import React from 'react';
import Link from 'next/link';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RichText } from '@/components/RichText';

type Post = {
  category?: string;
  content?: Parameters<typeof RichText>[0]['content'];
  createdAt?: string;
  publishedAt?: string;
  summary?: string;
  title: string;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = 'force-dynamic';

function formatDate(date?: string) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}



export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  const post = result.docs[0] as unknown as Post | undefined;

  if (!post) {
    notFound();
  }

  const date = formatDate(post.publishedAt ?? post.createdAt);

  return (
    <article className="flex flex-col items-center min-h-screen py-16 px-6 lg:px-8">
      <div className="w-full max-w-3xl mb-8">
        <Link href="/blog" className="inline-flex items-center text-muted hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Blog
        </Link>
      </div>

      <div className="w-full max-w-3xl text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6 text-sm text-muted">
          {post.category ? (
            <span className="px-3 py-1 rounded bg-secondary/10 text-secondary">{post.category}</span>
          ) : null}
          {date ? <span>{date}</span> : null}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          {post.title}
        </h1>
        {post.summary ? (
          <p className="text-xl text-muted text-left mb-12 border-l-4 border-primary pl-4">
            {post.summary}
          </p>
        ) : null}
      </div>

      <div className="w-full max-w-3xl">
        <RichText content={post.content} />

        <div className="my-12 p-8 rounded-sm bg-surface/50 border border-white/10 text-center">
          <h3 className="text-2xl font-bold mb-4 text-text mt-0">Gostou deste artigo?</h3>
          <p className="text-muted mb-6">Assine nossa newsletter para receber as melhores análises direto no seu email.</p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <input type="email" placeholder="Seu melhor email" className="flex h-11 rounded-md border border-white/10 bg-surface px-4 py-2 text-sm text-text focus:outline-none focus:border-primary w-full sm:max-w-xs" />
            <Button>Assinar</Button>
          </div>
        </div>
      </div>
    </article>
  );
}
