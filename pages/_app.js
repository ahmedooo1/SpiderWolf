import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const showAdmin = !router.asPath.startsWith("/admin/")
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (<>
    <SessionProvider session={session}>
      {showAdmin && <Header />}
      <ToastContainer
        limit={1}
        theme="dark"
      />
      <Component {...pageProps} />
      {showAdmin && <Footer />}
    </SessionProvider>
  </>)
}
