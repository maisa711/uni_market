import Provider from '@components/Provider'
import Navbar from '@components/Navbar'
import '@styles/globals.css'

export const metadata = {
  title: 'Uni Market',
  description: 'This is a marketplace for university students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-main-bg '>
        <Provider>
          <main>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
