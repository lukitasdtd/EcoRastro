import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="EcoRastro Home">
      <div className="relative w-32 h-10">
        <Image
          src="/logo.png"
          alt="EcoRastro Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </Link>
  );
}