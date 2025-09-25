
'use client';

import * as React from 'react';
import { Conversation, Message } from '@/lib/data/mock-chat-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Mic, SendHorizonal, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatWindow({ conversation, onBack }: { conversation: Conversation | undefined, onBack?: () => void }) {
  if (!conversation) {
    return (
      <div className="flex-1 flex-col items-center justify-center h-full bg-gray-50 hidden md:flex">
        <div className="text-center">
          <p className="text-xl font-medium text-muted-foreground">Selecciona un chat</p>
          <p className="text-sm text-muted-foreground mt-2">Elige una de tus conversaciones para empezar a chatear.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      <ChatHeader foundationName={conversation.foundationName} avatar={conversation.avatar} onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/80">
        {conversation.messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
      </div>
      <ChatInput />
    </div>
  );
}

function ChatHeader({ foundationName, avatar, onBack }: { foundationName: string; avatar: string; onBack?: () => void; }) {
    return (
      <div className="flex items-center gap-2 p-3 border-b bg-white z-10 shadow-sm">
        {onBack && 
          <Button onClick={onBack} variant="ghost" size="icon" className="md:hidden mr-1">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Volver</span>
          </Button>
        }
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={foundationName} />
          <AvatarFallback>{foundationName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-800">{foundationName}</p>
        </div>
      </div>
    );
}

function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === 'me';
  return (
    <div className={cn("flex items-end gap-2 w-full", isMe ? "justify-end" : "justify-start")}>
      {!isMe && (
          <Avatar className="h-8 w-8 self-start">
              <AvatarImage src="/logo.png" />
              <AvatarFallback>F</AvatarFallback>
          </Avatar>
      )}
      <div className={cn("flex flex-col space-y-1", isMe ? "items-end" : "items-start")}>
        {!isMe && <p className="text-xs text-gray-500 ml-3">Fundación Animalia</p>}
        <div
            className={cn(
            "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl border",
            isMe
                ? "bg-gray-200 text-gray-900 rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"
            )}
        >
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
        {isMe && <p className="text-xs font-semibold mr-2">Me</p>}
      </div>
    </div>
  );
}

function ChatInput() {
  return (
    <div className="p-4 border-t bg-gray-100">
      <div className="relative">
        <Input
          placeholder="Escribe un mensaje..."
          className="py-6 pr-32 pl-12 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-full"
        />
        <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-gray-700">
          <Paperclip className="h-5 w-5" />
        </Button>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-gray-700">
                <Mic className="h-5 w-5" />
            </Button>
            <Button size="icon" className="h-9 w-9 bg-green-500 hover:bg-green-600 rounded-full">
                <SendHorizonal className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}