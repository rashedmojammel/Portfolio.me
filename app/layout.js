import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Rashedul Alam — Portfolio',
  description:
    'Rashedul Alam — Software Engineer and CSE student at AIUB, Bangladesh. Full-stack, IoT & AI-driven projects.',
  icons: { icon: '/img/Nh.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
