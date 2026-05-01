import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GT7 Setup Advisor — Telemetry-Driven Tuning Engine',
  description:
    'Gerador inteligente de setups para Gran Turismo 7 v1.69. Suspensão, aerodinâmica, diferencial e estratégia de pits calculados por motor de física calibrado.',
  keywords: ['GT7', 'Gran Turismo 7', 'setup', 'tuning', 'telemetria', 'eSports'],
  authors: [{ name: 'GT7 Setup Advisor' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
