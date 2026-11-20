import { notFound } from 'next/navigation';

// Dil önekli ama tanımlı olmayan her adresi (ör. /tr/olmayan-sayfa) yakalar ve
// Next.js'in varsayılan sayfası yerine [locale]/not-found.tsx'i gösterir.
// Hiçbir yol önceden üretilmez ve dynamicParams kapalıdır; böylece bu adresler
// sayfa akışı başlamadan gerçek bir 404 durum koduyla döner.
export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export default function CatchAllPage() {
  notFound();
}
