'use client'
import { useState } from 'react'
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Paper,
  Button,
  Box,
  Textarea,
  Text,
  ScrollArea,
  Divider,
  Group,
} from '@mantine/core'
import Image from 'next/image'
import { ColorSchemesSwitcher } from '@/components/color-schemes-switcher'
import { IconSend2 } from '@tabler/icons-react'

interface Message {
  text: string
  sender: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState<string>('')

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'You' },
      ])
      setMessage('')
    }
  }

  return (
    <AppShell
      header={{ height: 60 }}
      padding='md'
      style={{
        height: '100vh', // занимаем весь экран
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* --- Шапка --- */}
      <AppShellHeader>
        <Group className='flex items-center justify-between h-full px-md'>
          <Image
            className='dark:invert'
            src='https://multimaxx-assets.fra1.cdn.digitaloceanspaces.com/short-mmx-icon.png'
            alt='logo'
            width={38}
            height={38}
          />
          <ColorSchemesSwitcher />
        </Group>
      </AppShellHeader>

      {/* --- Основная часть (сообщения + поле ввода) --- */}
      <AppShellMain
        style={{
          flex: 1, // заполняет всё оставшееся место
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'clamp(400px, 80%, 900px)',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Блок с сообщениями */}
        <Paper
          shadow='md'
          style={{
            flex: 1, // растягиваем Paper на всё оставшееся место
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // чтобы внутри ScrollArea работал вертик. скролл
            borderRadius: '12px',
            border: '1px solid var(--mantine-color-border, #e0e0e0)',
          }}
        >
          <ScrollArea
            style={{
              flex: 1,
              padding: '1rem',
              overflowX: 'hidden', // прячем горизонтальный скролл
            }}
          >
            <Box
              // Чтобы текст переносился:
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  style={{
                    marginBottom: '0.75rem',
                    textAlign: msg.sender === 'You' ? 'right' : 'left',
                  }}
                >
                  <Paper
                    withBorder
                    style={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      backgroundColor:
                        msg.sender === 'You'
                          ? 'var(--mantine-color-blue-light)'
                          : 'var(--mantine-color-gray-light)',
                      borderRadius: '8px',
                      // И внутри самого сообщения тоже можно убедиться, что текст
                      // переносится. Но если <Box> выше задаёт перенос, этого уже хватает:
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      maxWidth: '100%', // чтобы не вылезать за границы
                    }}
                  >
                    <Text size='sm' color='dimmed'>
                      {msg.sender}
                    </Text>
                    <Text
                      style={{
                        // На всякий случай дублируем свойства переноса
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {msg.text}
                    </Text>
                  </Paper>
                </Box>
              ))}
            </Box>
          </ScrollArea>
          <Divider />
        </Paper>

        {/* Блок с полем ввода (не скроллится) */}
        <Box
          style={{
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--mantine-color-border, #e0e0e0)',
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Textarea
            placeholder='Type your message...'
            variant='filled'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autosize
            minRows={2}
            maxRows={6}
            style={{ flex: 1, maxHeight: '150px', overflowY: 'auto' }}
          />
          <Button
            onClick={sendMessage}
            variant='filled'
            color='orange'
            style={{ height: '40px', padding: '0 10px' }}
            radius='xl'
            className='dark:invert'
          >
            <IconSend2 size={20} stroke={2} />
          </Button>
        </Box>
      </AppShellMain>
    </AppShell>
  )
}
