import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {

  if(Component.getLayout){
    return  Component.getLayout(<Component {...pageProps} />)   
  }

  return (<>
  <Header/>
  <Component {...pageProps} />
  <Footer/>
  </>)
}
