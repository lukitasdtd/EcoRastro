
'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { mockConversations, Conversation } from '@/lib/data/mock-chat-data';
import { ChatSidebar } from '@/components/messaging/chat-sidebar';
import { ChatWindow } from '@/components/messaging/chat-window';
import { cn } from '@/lib/utils';

export default function MessagingPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Para vistas móviles, determina si estamos viendo la ventana de chat
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Por defecto, selecciona el primer chat en la carga inicial para escritorio
  useEffect(() => {
    if (window.innerWidth >= 768) { // 768px es el breakpoint `md` de Tailwind
        if(!selectedConversationId && conversations.length > 0) {
            setSelectedConversationId(conversations[0].id);
        }
    }
  }, [conversations, selectedConversationId]);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    setIsChatVisible(true); // Mostrar la ventana de chat en móvil
  };

  const handleBackToList = () => {
    setIsChatVisible(false); // Volver a la lista de chats en móvil
    setSelectedConversationId(null); // Deseleccionar para que en desktop se vea el placeholder
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <MessagingLayout>
      <div className={cn("h-full w-full flex transition-all duration-300", isChatVisible && 'max-md:-translate-x-full')}>
        {/* Sidebar siempre está presente, pero se oculta en móvil con translate */}
        <div className="h-full w-full md:w-auto flex-shrink-0">
            <ChatSidebar 
                conversations={conversations} 
                selectedConversationId={selectedConversationId} 
                onSelectConversation={handleSelectConversation} 
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
            />
        </div>
        
        {/* Chat Window ocupa el espacio y es visible en desktop o cuando está activo en móvil */}
        <div className={cn("h-full w-full flex-shrink-0 md:flex-1")}>
            <ChatWindow conversation={selectedConversation} onBack={handleBackToList} />
        </div>
      </div>
    </MessagingLayout>
  );
}

function MessagingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-2xl p-0 sm:p-4 h-full">
        <div className="border rounded-lg h-[calc(100vh-100px)] bg-white shadow-sm overflow-hidden relative">
            {children}
        </div>
    </div>
  );
}
