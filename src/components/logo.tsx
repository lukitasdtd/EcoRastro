import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="EcoRastro Home"
    >
      {/* Usando el componente Image de Next.js con un archivo de la carpeta /public. */}
      {/* Se especifican width y height para evitar Layout Shift y warnings. */}
      {/* La clase h-9 asegura la altura visual y w-auto mantiene la proporción. */}
      <Image
        src="/logo.png"
        alt="EcoRastro Logo"
        width={140}
        height={36}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}
