import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar/app-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ReduxProvider } from '@/provider/ReduxProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Kudwa'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReduxProvider>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />

              <SidebarTrigger />
              {children}
            </SidebarProvider>
          </TooltipProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
