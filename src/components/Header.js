import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
        <div className="flex">
          <Link href="/" className="flex space-x-1 items-center">
            <Image className="w-8 h-8" src="/bellcoin.png" width={64} height={64} />
            <span className="font-bold text-lg">BELSwap</span>
          </Link>
        </div>
 
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <Link href={`https://belscan.io/address/${process.env.NEXT_PUBLIC_BELLCOIN_ADDRESS}`} target="_blank" className="text-sm font-semibold leading-6 text-gray-900">
            Escrow contract
          </Link>

          <Link href='/faq' className="text-sm font-semibold leading-6 text-gray-900">
            FAQ
          </Link>

          <Link href='/listings' className="text-sm font-semibold leading-6 text-gray-900">
            Your listings
          </Link>

          <ConnectButton />
        </div>
       
      </nav>

    </header>
  )
}
