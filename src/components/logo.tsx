import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="EcoRastro Home"
    >
      <Image
        src="/logo.png"
        alt="EcoRastro Logo"
        width={160}
        height={50}
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
}
