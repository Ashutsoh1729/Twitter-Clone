import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import ResisterModal from '@/components/modals/ResisterModal'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster/>
      <LoginModal />
      <ResisterModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
