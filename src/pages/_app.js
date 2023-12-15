import '@/styles/globals.css'

import { WagmiConfig, createConfig, configureChains, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Header } from '@/components/Header';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }), publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})
 
export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Header />
      <Component {...pageProps} />
    </WagmiConfig>
  )
}