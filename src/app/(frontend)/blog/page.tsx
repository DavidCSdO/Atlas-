import React from 'react';
import Link from 'next/link';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';

type Media = {
  alt?: string;
  url?: string;
};

type Post = {
  category?: string;
  coverImage?: Media | number | null;
  createdAt?: string;
  publishedAt?: string;
  slug: string;
  summary?: string;
  title: string;
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

function getImage(image?: Media | number | null) {
  if (image && typeof image === 'object' && image.url) {
    return image;
  }

  return null;
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 30,
    sort: '-publishedAt',
  });

  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-6 lg:px-8">
      <FadeIn className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Atlas</h1>
        <p className="text-lg text-muted">
          Artigos, análises de mercado e dicas de especialistas para você investir melhor e tomar decisões financeiras mais inteligentes.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {(posts.docs as unknown as Post[]).map((post) => {
          const image = getImage(post.coverImage);
          const date = formatDate(post.publishedAt ?? post.createdAt);

          return (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full flex flex-col cursor-pointer group overflow-hidden p-0">
                  {image ? (
                    <img
                      src={image.url}
                      alt={image.alt ?? post.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted">
                      {post.category ? (
                        <span className="px-3 py-1 rounded bg-secondary/10 text-secondary">{post.category}</span>
                      ) : null}
                      {date ? <span>{date}</span> : null}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.summary ? (
                      <p className="text-muted flex-grow mb-6 line-clamp-3">
                        {post.summary}
                      </p>
                    ) : null}
                    <div className="mt-auto flex items-center text-primary font-medium group-hover:underline">
                      Ler artigo <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {posts.docs.length === 0 ? (
        <div className="w-full max-w-3xl rounded-sm border border-white/10 bg-surface/40 p-8 text-center text-muted">
          Nenhum artigo cadastrado ainda. Crie o primeiro em <span className="text-text">/admin</span>.
        </div>
      ) : null}
    </div>
  );
}
