import { SessionProvider, getSession } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '@/styles/globals.css'

export default function App({ Component, pageProps, router }) {
  const showFooter = !router.asPath.startsWith("/admin/");
  const showHeader = showFooter;

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <SessionProvider session={pageProps.session}>
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        {showHeader && <Header />}
        <ToastContainer limit={1} theme="dark" />
        <div className="flex-grow">
          <Component {...pageProps} router={router} />
        </div>
        {showFooter && <Footer />}
      </div>
    </SessionProvider>
  );
}