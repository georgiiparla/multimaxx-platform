import type { Metadata } from "next"; // Тип для задания метаинформации страницы
import {
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
} from "@mantine/core"; // Импорт Mantine для управления темами и компонентами
import localFont from "next/font/local"; // Функция для подключения локальных шрифтов
import Head from "next/head"; // Управление содержимым <head>
import "./globals.css"; // Подключение глобальных стилей
import { breakpoints, colors } from "./theme"; // Импорт настроек темы (точки перелома и цвета)

// Подключение шрифта GeistSans из локального файла
const geistSans = localFont({
  src: "./fonts/GeistVF.woff", // Путь к файлу шрифта
  variable: "--font-geist-sans", // CSS-переменная для использования шрифта
  weight: "100 900", // Диапазон весов
});

// Подключение шрифта GeistMono из локального файла
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // Путь к файлу шрифта
  variable: "--font-geist-mono", // CSS-переменная для использования шрифта
  weight: "100 900", // Диапазон весов
});

// Метаинформация страницы: заголовок и описание
export const metadata: Metadata = {
  title: "Multimaxx Platform", // Заголовок страницы
  description: "Multimaxx Platform", // Описание страницы
};

// Создание темы Mantine с объединением пользовательских настроек
const theme = mergeMantineTheme(
  DEFAULT_THEME, // Базовая тема Mantine
  createTheme({
    fontFamily: geistSans.style.fontFamily, // Основной шрифт
    fontFamilyMonospace: geistMono.style.fontFamily, // Моноширинный шрифт
    breakpoints, // Точки перелома (адаптивность)
    colors, // Кастомные цвета
  }),
);

// Главный компонент для обертки приложения
export default function RootLayout({
  children, // Вложенные элементы, передаваемые в компонент
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <Head>
        <ColorSchemeScript /> 
      </Head>
      <body className="antialiased"> 
        <MantineProvider theme={theme}> 
          {children} 
        </MantineProvider>
      </body>
    </html>
  );
}
