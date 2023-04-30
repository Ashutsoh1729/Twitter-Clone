import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import ResisterModal from '@/components/modals/ResisterModal'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoginModal />
      <ResisterModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
