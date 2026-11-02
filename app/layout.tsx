import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mindful Impact Hub — Give Wisely, Act Locally',
  description:
    'A mental-health-aware dashboard combining vetted charity data, local volunteer matching, and a mindful low-energy mode for conscious changemakers.',
  keywords: ['charity', 'volunteer', 'mental health', 'impact', 'philanthropy', 'sustainability'],
  openGraph: {
    title: 'Mindful Impact Hub',
    description: 'Give wisely. Act locally. Stay grounded.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
