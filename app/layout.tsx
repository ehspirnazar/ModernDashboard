import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export const metadata = { title: 'Modern Dahboard with NextJS' }

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  )
}