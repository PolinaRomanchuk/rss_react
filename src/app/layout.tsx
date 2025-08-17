import { Metadata } from 'next';
import { Nunito, Poppins } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'React app',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
