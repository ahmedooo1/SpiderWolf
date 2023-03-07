import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (<>
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  </>)
}
