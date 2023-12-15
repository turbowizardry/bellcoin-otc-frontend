import { ConnectButton } from "./ConnectButton"
import Image from "next/image"

export function Header() {
  return (
    <header className="">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="flex space-x-1 items-center">
            <Image className="w-8 h-8" src="/bellcoin.png" width={64} height={64} />
            <span className="font-bold text-lg">BELSwap</span>
          </a>
        </div>
 
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <ConnectButton />
        </div>
       
      </nav>

    </header>
  )
}
