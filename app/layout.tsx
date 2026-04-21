import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eid Sheba',
  description:
    'Eid Sheba - Full Stack Developer specializing in modern web applications with React.js, ASP.NET, C#, and SQL Server. Transforming UI designs into responsive, user-friendly websites with clean code and performance optimization.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/fonts.css" />
        <link rel="preload" href="/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/style-merged.css" />
        <link rel="stylesheet" href="/css/cursor-scribble.css" />
        <link rel="stylesheet" href="/css/lightbox.css" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
