import Image from 'next/image';
import { BRAND } from '@/config/brand';
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center">
      <Image src="/brand/icon.svg" alt="RIWARA monogram" width={96} height={96} priority />
      <h1 className="font-serif text-5xl tracking-[0.3em] text-gold-light">{BRAND.name}</h1>
      <p className="text-sm tracking-[0.35em] text-ivory/70">{BRAND.tagline}</p>
      <p className="max-w-md text-ivory/60">Storefront foundation is installed. Pages are added in the next build phases.</p>
    </main>
  );
}
