import '@/styles/globals.css'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { optimism, optimismSepolia } from "wagmi/chains";
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Header } from '@/components/Header';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimism, optimismSepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }), 
    publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
})
 
export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <Header />
      <Component {...pageProps} />
    </WagmiConfig>
  )
}