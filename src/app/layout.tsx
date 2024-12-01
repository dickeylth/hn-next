import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HackerNews - Social News',
  description: 'A modern HackerNews client with Facebook-like UI',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
          <nav className="h-14">
            <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="text-2xl font-bold text-orange-500">HN</h1>
                <div className="flex items-center gap-1">
                  <a href="/" className="px-4 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100">
                    Top
                  </a>
                  <a href="/new" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                    New
                  </a>
                  <a href="/best" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                    Best
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search stories..."
                    className="w-64 px-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 pt-20 pb-8">
          {children}
        </main>
      </body>
    </html>
  )
}
