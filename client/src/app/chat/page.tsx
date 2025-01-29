'use client';

import { useState } from 'react';
import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import { Header } from '@/components/chat/Header';
import { MessagesList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';

interface Message {
  text: string;
  sender: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'You' },
      ]);
      setMessage('');
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Шапка */}
      <AppShellHeader style={{ borderBottom: '1px solid var(--mantine-color-border, #d4d4d4)' }}>
        <Header />
      </AppShellHeader>

      {/* Основная часть */}
      <AppShellMain
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'clamp(400px, 80%, 900px)',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <MessagesList messages={messages} />
        <MessageInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </AppShellMain>
    </AppShell>
  );
}
