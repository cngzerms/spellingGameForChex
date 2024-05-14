import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Multilingual Spelling Bee',
  description: 'A multilingual spelling bee game built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

