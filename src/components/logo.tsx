import { Leaf } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Leaf className="h-8 w-8 text-primary" />
      <span className="font-headline text-2xl font-bold text-primary tracking-wider">
        EcoTrack
      </span>
    </Link>
  );
}
