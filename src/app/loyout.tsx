import type { Metadata } from 'next';
import { Nunito, Poppins } from 'next/font/google';
import './global.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import { ThemeProvider } from '../components/context/ThemeContext';
import ErrorBoundary from '../components/error/ErrorBoundary';

export const metadata: Metadata = {
  title: 'React app',
  icons: {
    icon: '/favicon.png',
  },
};

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} ${poppins.className}`}>
        <Provider store={store}>
          <ThemeProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
