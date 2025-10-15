import PostCard from '@/components/post-card';

// aquí se crea la vista post comunitarios con ejemplos visuales 
export default function PostComunitarios() {
  const posts = Array(10).fill({
    tipo: 'mascota',
    imagen_url: '/gato-ejemplo.jpg',
    titulo: 'Título del Post de Ejemplo',
    autor: 'Autor de Ejemplo',
    ubicacion: 'Ubicación de Ejemplo',
    fecha: 'hace 2 días',
    contenido: 'Este es un extracto del contenido del post. Es un texto de ejemplo para mostrar cómo se vería el contenido en la tarjeta.',
    likes: 42,
    comentarios: 15,
  });

  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Post Comunitarios</h1>
        <p className="text-gray-600 text-lg mb-8">
    Aquí podrás explorar historias compartidas por la comunidad. Desde mascotas que encontraron su camino a casa hasta vecinos que transformaron espacios en huertas urbanas. Cada post es un testimonio de amor, solidaridad y compromiso con el medio ambiente. ¡Inspírate y comparte tu propia historia!
  </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
