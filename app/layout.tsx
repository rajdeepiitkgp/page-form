import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import DesignerContextProvider from '@/components/context/DesignerContext';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Page Form',
  description: 'An app to create and store dynamic form and record responses',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <ClerkProvider>
    <html lang='en'>
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <DesignerContextProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </DesignerContextProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;

