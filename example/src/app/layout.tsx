import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calendrax Example - Next.js',
  description: 'Example implementation of Calendrax calendar component',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

