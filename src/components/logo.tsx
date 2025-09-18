import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-primary/10 p-2 rounded-full">
        <Leaf className="h-6 w-6 text-primary" />
      </div>
      <span className="text-2xl font-bold text-foreground tracking-wide">
        EcoRastro
      </span>
    </Link>
  );
}
