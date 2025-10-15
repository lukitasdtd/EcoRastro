
import Image from "next/image";

interface LogoProps {
    size?: 'default' | 'large';
}

export function Logo({ size = 'default' }: LogoProps) {
    const sizes = {
        default: {
            width: 240,
            height: 124,
            className: "h-16 w-auto mt-2",
        },
        large: {
            width: 360,
            height: 186,
            className: "h-64 w-auto",
        }
    };

    const selectedSize = sizes[size];

    return (
        <div className="inline-flex items-center gap-2">
            <span className="sr-only">Ir a la página de inicio de EcoRastro</span>
            <Image
                src="/logoeco2.png"
                alt="" // La imagen es decorativa, el span oculto describe el enlace.
                width={selectedSize.width}
                height={selectedSize.height}
                priority
                className={selectedSize.className}
            />
        </div>
    );
}
