export interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  foundationName: string;
  avatar: string; // URL o identificador para el avatar
  messages: Message[];
  unreadCount: number;
  onlineStatus: 'online' | 'offline';
  lastMessagePreview: string;
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    foundationName: 'Fundación Animalia',
    avatar: '/logo.png',
    unreadCount: 5,
    onlineStatus: 'online',
    lastMessagePreview: 'Hola!!',
    messages: [
      { id: 'm1', sender: 'them', text: 'Hola!!', timestamp: '10:30 AM' },
      { id: 'm2', sender: 'me', text: 'Hola!!', timestamp: '10:31 AM' },
      { id: 'm3', sender: 'them', text: '¿Cómo podemos ayudarte hoy con respecto a tu reporte?', timestamp: '10:32 AM' },
      { id: 'm4', sender: 'me', text: 'Quería saber si habían podido revisar el caso del perro abandonado que reporté ayer.', timestamp: '10:33 AM' },
      { id: 'm5', sender: 'them', text: 'Sí, lo estamos revisando. Un equipo irá a la ubicación indicada en las próximas 2 horas.', timestamp: '10:34 AM' },
    ],
  },
  {
    id: '2',
    foundationName: 'Fundación Arca',
    avatar: '/logo.png',
    unreadCount: 4,
    onlineStatus: 'offline',
    lastMessagePreview: 'Perfecto, muchas gracias.',
    messages: [
        { id: 'm6', sender: 'me', text: 'Les envié la ubicación por el formulario.', timestamp: 'Ayer' },
        { id: 'm7', sender: 'them', text: 'Recibido. Mañana a primera hora lo gestionamos.', timestamp: 'Ayer' },
        { id: 'm8', sender: 'me', text: 'Perfecto, muchas gracias.', timestamp: 'Ayer' },
    ],
  },
  {
    id: '3',
    foundationName: 'Fundacion Huella',
    avatar: '/logo.png',
    unreadCount: 3,
    onlineStatus: 'online',
    lastMessagePreview: '¿Tienen espacio para un gato?',
    messages: [
        { id: 'm9', sender: 'me', text: 'Hola, ¿tienen espacio para un gato que encontré?', timestamp: '11:00 AM' },
    ],
  },
  {
    id: '4',
    foundationName: 'Garras y Patitas',
    avatar: '/logo.png',
    unreadCount: 0,
    onlineStatus: 'offline',
    lastMessagePreview: '¡Mil gracias por todo!',
    messages: [
        { id: 'm10', sender: 'them', text: 'Ya rescatamos al perrito. Está a salvo en nuestro refugio.', timestamp: 'Hace 2 días' },
        { id: 'm11', sender: 'me', text: '¡Qué buena noticia! ¡Mil gracias por todo!', timestamp: 'Hace 2 días' },
    ],
  },
  {
    id: '5',
    foundationName: 'Centro de Rescate',
    avatar: '/logo.png',
    unreadCount: 4,
    onlineStatus: 'online',
    lastMessagePreview: 'Necesitamos más detalles.',
    messages: [
        { id: 'm12', sender: 'them', text: 'Hola, sobre el ave que reportaste, necesitamos más detalles de su condición.', timestamp: '1:15 PM' },
    ],
  },
  {
    id: '6',
    foundationName: 'Fundación Animal',
    avatar: '/logo.png',
    unreadCount: 10,
    onlineStatus: 'offline',
    lastMessagePreview: 'Ok, estamos en camino.',
    messages: [
      { id: 'm13', sender: 'them', text: 'Ok, estamos en camino.', timestamp: '9:05 AM'}
    ],
  },
  {
    id: '7',
    foundationName: 'Fauna city',
    avatar: '/logo.png',
    unreadCount: 9,
    onlineStatus: 'online',
    lastMessagePreview: '¿Puedes enviar una foto?',
    messages: [
      { id: 'm14', sender: 'them', text: '¿Puedes enviar una foto?', timestamp: 'Ayer'}
    ],
  },
  {
    id: '8',
    foundationName: 'Fundación Fauna',
    avatar: '/logo.png',
    unreadCount: 5,
    onlineStatus: 'offline',
    lastMessagePreview: 'Gracias por tu reporte.',
    messages: [
      { id: 'm15', sender: 'them', text: 'Gracias por tu reporte.', timestamp: '11:20 AM'}
    ],
  },
];
