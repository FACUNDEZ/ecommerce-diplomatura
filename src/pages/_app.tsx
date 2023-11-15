import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '@/components/Footer'
import UserProvider from '@/context/UserContext'
import CartProvider from '@/context/CartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <Component {...pageProps} />
          <Footer />
        </CartProvider>
      </UserProvider>
    </>
  )
}
