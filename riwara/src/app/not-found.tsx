import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-4xl text-gold-light">Page not found</h1>
      <p className="text-ivory/70">The page you are looking for does not exist.</p>
      <Link href="/" className="border border-gold px-6 py-3 text-gold-light">Back to home</Link>
    </main>
  );
}
