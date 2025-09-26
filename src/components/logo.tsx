import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2"
      aria-label="EcoRastro Home"
    >
      <Image
        src="/logo.png"
        alt="EcoRastro Logo"
        width={240} // Aumentado desde 140
        height={62} // Aumentado desde 36 para mantener la proporción
        priority
        className="h-16 w-auto" // Clase aumentada para un mayor tamaño
      />
    </Link>
  );
}
