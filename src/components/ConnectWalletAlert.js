import { XCircleIcon } from '@heroicons/react/20/solid'
import { ConnectButton } from '@rainbow-me/rainbowkit';
export function ConnectWalletAlert() {
  return (
    <div className="rounded-md bg-indigo-100 py-6 px-6">
      <div className="flex flex-col space-y-3 justify-center items-center">

        <div className="font-semibold text-lg text-indigo-700 overflow-hidden">
          Connect wallet to continue
        </div>
        <ConnectButton />
      </div>
    </div>
  )
}