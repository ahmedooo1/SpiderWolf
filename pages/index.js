import Head from 'next/head'
import { Inter } from '@next/font/google'
import HomeComponent from '@/components/Home/Home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <HomeComponent/>
    </>
  )
}
