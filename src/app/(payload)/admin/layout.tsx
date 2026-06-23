import configPromise from '@payload-config';
import '@payloadcms/next/css';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import type { ReactNode } from 'react';
import type { ServerFunctionClient } from 'payload';
import { importMap } from './importMap.js';

type Props = {
  children: ReactNode;
};

const serverFunction: ServerFunctionClient = async (args) => {
  'use server';

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

export default function PayloadAdminLayout({ children }: Props) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
