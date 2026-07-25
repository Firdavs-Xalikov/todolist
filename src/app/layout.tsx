import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'FX Life OS — High Performance Personal Operating System',
  description: 'A premium personal life operating system combining Apple Human Interface, Linear, Raycast, Vercel, and Notion design aesthetics.',
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
