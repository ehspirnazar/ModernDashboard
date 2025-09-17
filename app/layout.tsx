import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'

export const metadata = { title: 'Modern Dahboard with NextJS' }

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <AuthProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}