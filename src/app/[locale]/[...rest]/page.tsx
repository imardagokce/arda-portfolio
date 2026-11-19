import { notFound } from 'next/navigation';

// Dil önekli ama tanımlı olmayan her adresi (ör. /tr/olmayan-sayfa) yakalar ve
// Next.js'in varsayılan sayfası yerine [locale]/not-found.tsx'i gösterir.
export default function CatchAllPage() {
  notFound();
}
