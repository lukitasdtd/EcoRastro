import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { email: string } }
) {
    const { email } = params;
    console.log(`API a /api/users/email: Buscando usuario con email: ${email}`);

    if (!email) {
        console.error('API Error: No se proporcionó email.');
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const user = await prisma.usuario.findUnique({
            where: {
                // El email que viene de la URL puede estar codificado (ej. %40 en vez de @)
                // lo decodificamos para asegurar una búsqueda correcta.
                correo: decodeURIComponent(email),
            },
        });

        if (!user) {
            console.warn(`API: No se encontró usuario para el email: ${decodeURIComponent(email)}`);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log('API: Usuario encontrado, devolviendo datos:', user);
        return NextResponse.json(user);
    } catch (error) {
        console.error('API Error grave al buscar usuario:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
