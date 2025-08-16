'use client';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../App').then((m) => m.default), {
  ssr: false,
});

export function ClientOnly() {
  return <App />;
}
