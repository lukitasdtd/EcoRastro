
'use client';

import * as React from 'react';
import { Conversation } from '@/lib/data/mock-chat-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export function ChatSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
  searchQuery,
  onSearchChange,
}: {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {

  const filteredConversations = conversations.filter(conversation =>
    conversation.foundationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full md:w-[320px] border-r flex flex-col bg-gray-50/50">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Contactos</h2>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar chats..."
            className="pl-10 w-full rounded-full bg-white"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <p className="text-sm font-medium text-gray-500 p-4 pb-2">Chats</p>
        <ConversationList conversations={filteredConversations} selectedConversationId={selectedConversationId} onSelectConversation={onSelectConversation} />
      </div>
    </div>
  );
}

function ConversationList({ conversations, selectedConversationId, onSelectConversation }: {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}) {
  return (
    <nav className="p-2 space-y-1">
      {conversations.map(conv => (
        <ConversationItem key={conv.id} conversation={conv} isSelected={conv.id === selectedConversationId} onSelect={() => onSelectConversation(conv.id)} />
      ))}
       {conversations.length === 0 && <p className='text-center text-sm text-muted-foreground p-4'>No se encontraron conversaciones.</p>}
    </nav>
  );
}

function ConversationItem({ conversation, isSelected, onSelect }: { conversation: Conversation; isSelected: boolean; onSelect: () => void; }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors hover:bg-green-100/50",
        isSelected && "bg-green-100"
      )}
    >
      <div className="relative">
        <Avatar className={cn("h-10 w-10 border-2", isSelected ? "border-green-500" : "border-transparent")}>
          <AvatarImage src={conversation.avatar} alt={conversation.foundationName} />
          <AvatarFallback>{conversation.foundationName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className={cn(
          "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white",
          conversation.onlineStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'
        )}></span>
      </div>
      <div className="flex-1 truncate">
        <p className="font-semibold text-sm">{conversation.foundationName}</p>
        <p className={cn("text-xs truncate", isSelected ? "text-gray-700" : "text-gray-500")}>{conversation.lastMessagePreview}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <div className="bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {conversation.unreadCount}
        </div>
      )}
      {conversation.unreadCount === 0 && <div className="text-green-500 opacity-75"><svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"/></svg></div> }
    </button>
  );
}
