import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { optimism } from "wagmi/chains";
import { Analytics } from '@vercel/analytics/react';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimism],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }), 
    publicProvider()
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'BELSwap',
  projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
 
export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Analytics />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}