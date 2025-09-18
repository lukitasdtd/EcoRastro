import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-primary/10 p-1.5 rounded-lg">
        <Leaf className="h-5 w-5 text-primary" />
      </div>
      <span className="text-xl font-bold text-foreground tracking-tight">
        EcoRastro
      </span>
    </Link>
  );
}
