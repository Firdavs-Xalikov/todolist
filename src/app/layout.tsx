import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Project 25 — Personal Operating System',
  description: 'A premium iPhone-native personal operating system combining Apple Health, Linear, Raycast, Vercel, and Notion aesthetics.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090909] text-white antialiased selection:bg-[#4F8CFF] selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
