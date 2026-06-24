import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [],
    },

    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    {
      slug: 'services',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'summary',
          type: 'textarea',
        },
        {
          name: 'coverImageUrl',
          type: 'text',
          admin: {
            description: 'URL da imagem de capa (opcional)',
          },
        },
        {
          name: 'publishedAt',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'category',
          type: 'select',
          options: ['Renda Fixa', 'Fundos', 'Ações', 'Educação Financeira', 'Previdência'],
        },
      ],
    },
    {
      slug: 'testimonials',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'settings',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'address', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'aboutImageUrl', type: 'text', admin: { description: 'URL da imagem institucional (opcional)' } },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',
  db: postgresAdapter({
    pool: process.env.DATABASE_URI
      ? { connectionString: process.env.DATABASE_URI }
      : process.env.PGHOST
        ? {
            host: process.env.PGHOST,
            port: Number(process.env.PGPORT) || 6543,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE || 'postgres',
            ssl: { rejectUnauthorized: false },
          }
        : { connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/atlas_fin' },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
