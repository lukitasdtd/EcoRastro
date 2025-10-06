
import Image from 'next/image';

export default function CommunityPage() {
  return (
    <div className="relative bg-[#E5E5E5] min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h1 className="text-6xl font-bold text-green-800" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            COMUNIDAD
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            "Un espacio donde ayudamos juntos a reencontrar mascotas con sus familias"
          </p>
        </section>

        {/* Placeholder for community posts */}
        <section className="mt-12">
          <div className="flex justify-center">
            <p className="text-gray-500">Próximamente: ¡Aquí verás las publicaciones de nuestra comunidad!</p>
          </div>
        </section>
      </main>
    </div>
  );
}
