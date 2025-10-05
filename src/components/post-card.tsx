import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, MapPin } from 'lucide-react';

export default function PostCard({ post }: { post: any }) {
  const tipoClass = post.tipo === 'mascota' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800';

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <img src={post.imagen_url} alt={post.titulo} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <Badge className={`${tipoClass} mb-2`}>{post.tipo}</Badge>
        <CardTitle className="text-xl font-bold mb-2">{post.titulo}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Avatar className="h-5 w-5 mr-2">
            <AvatarImage src={`https://github.com/shadcn.png`} alt={post.autor} />
            <AvatarFallback>{post.autor.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{post.autor}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{post.ubicacion}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{post.fecha}</p>
        <p className="text-base text-foreground line-clamp-3">{post.contenido}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted/40">
        <div className="flex items-center text-muted-foreground">
          <Heart className="h-5 w-5 mr-2" />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MessageCircle className="h-5 w-5 mr-2" />
          <span>{post.comentarios}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
