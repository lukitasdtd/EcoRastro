import type { Metadata } from 'next';
import { Quicksand, Roboto } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';

// configuración de fuentes
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['400', '500', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

//configuración de metadatos
export const metadata: Metadata = {
  title: 'EcoRastro',
  description: 'Conectando comunidades. Protegiendo ecosistemas.',
  icons: {
    icon: [
      { url: '/favicon3.png', sizes: '32x32' },
      { url: '/favicon3.png', sizes: '128x128' },
      { url: '/favicon3.png', sizes: '192x192' },
    ],
    apple: [
      { url: '/favicon3.png', sizes: '180x180' },
    ],
  },
};

//componente principal
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${quicksand.variable} ${roboto.variable}`} suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex-1 border-t-0 shadow-none ring-0">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
