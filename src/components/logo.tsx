
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
    size?: 'default' | 'large';
}

export function Logo({ size = 'default' }: LogoProps) {
    const sizes = {
        default: {
            width: 240,
            height: 124,
            className: "h-16 w-auto",
        },
        large: {
            width: 360,
            height: 186,
            className: "h-64 w-auto",
        }
    };

    const selectedSize = sizes[size];

    return (
        <Link
            href="/"
            className="inline-flex items-center gap-2"
            aria-label="EcoRastro Home"
        >
            <Image
                src="/logo.png"
                alt="EcoRastro Logo"
                width={selectedSize.width}
                height={selectedSize.height}
                priority
                className={selectedSize.className}
            />
        </Link>
    );
}
