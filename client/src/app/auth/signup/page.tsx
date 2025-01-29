'use client'

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link' // Импорт Link из next/link
import { Header } from '@/components/chat/Header'

import { signup } from '@/lib/actions'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await signup(name, email, password)
      console.log('Signup successful:', response)
    } catch (err: any) {
      setError(err.message)
      console.log('Signup error:', error)
    }
  }

  return (
    <AppShell
      header={{ height: 60 }}
      padding='md'
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Шапка */}
      <AppShellHeader
        style={{
          borderBottom: '1px solid var(--mantine-color-border, #d4d4d4)',
        }}
      >
        <Header />
      </AppShellHeader>

      {/* Основная часть */}
      <AppShellMain
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Центрирование по горизонтали
          justifyContent: 'center', // Центрирование по вертикали
          width: '100%',
          padding: '1rem',
        }}
      >
        <Paper
          style={{
            width: '100%',
            maxWidth: '450px',
            background: 'transparent', // Прозрачный фон
            boxShadow: 'none', // Убираем тень
          }}
        >
          {/* Логотип */}
          <div className='flex justify-center mb-4 dark:invert'>
            <Image
              src='https://multimaxx-assets.fra1.cdn.digitaloceanspaces.com/short-mmx-icon.png'
              alt='Logo'
              width={50}
              height={50}
            />
          </div>

          {/* Заголовок */}
          <Title order={2} className='text-center mb-2'>
            Create an account
          </Title>
          <Text className='text-center text-gray-500 mb-6'>
            Start your journey with Multimaxx Platform
          </Text>

          {/* Поля формы */}
          <form className='space-y-4' onSubmit={handleSubmit}>
            <TextInput
              label='Full Name'
              placeholder='Your full name'
              withAsterisk
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <TextInput
              label='Email'
              placeholder='Your email'
              withAsterisk
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <PasswordInput
              label='Password'
              placeholder='Create a password'
              withAsterisk
            />
            <PasswordInput
              label='Confirm Password'
              placeholder='Confirm your password'
              withAsterisk
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <div className='flex items-center'>
              <Checkbox label='I agree to the Terms and Conditions' />
            </div>
            {/* Кнопки */}
            <Button
              fullWidth
              size='md'
              color='yellow'
              className='mt-6 dark:bg-blue-500'
              type='submit'
            >
              Sign up
            </Button>
          </form>

          <Text className='text-center text-sm mt-6'>
            Already have an account?{' '}
            <Link
              href='/auth/login' // Переход на страницу входа
              className='text-yellow hover:underline dark:text-blue-500'
            >
              Sign in
            </Link>
          </Text>
        </Paper>
      </AppShellMain>
    </AppShell>
  )
}
