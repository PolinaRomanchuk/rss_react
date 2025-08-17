import { ClientOnly } from './client';
import '../../global.css';

export function generateStaticParams() {
  return [{ slug: [''] }, { slug: ['about'] }];
}

export default function Page() {
  return <ClientOnly />;
}
