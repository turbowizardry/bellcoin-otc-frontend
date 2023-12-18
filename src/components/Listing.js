import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { useAccount } from 'wagmi'

import { formatEther } from "ethers"
import Image from 'next/image'
import Link from 'next/link'

import { useContractWrite } from 'wagmi'
import bellcoinOTCABI from '@/abi/bellcoinOTC.json'

export function Listing({ listing, usdPrice, onBuy }) {
  //console.log(listing);

  const { address } = useAccount()
  const isAdmin = (address == process.env.NEXT_PUBLIC_CONTRACT_OWNER);

  const { write: depositWrite } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'markAsDeposited',
    args: [
      listing.listingId
    ]
  })

  const { write: fillWrite } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'markAsFulfilled',
    args: [
      listing.listingId
    ]
  })

  const adminDeposited = () => {
    depositWrite()
  }

  const adminFulfilled = () => {
    fillWrite()
  }

  if((listing.isCancelled || !listing.isDeposited) && !isAdmin) {
    return (<></>)
  }

  const fullPrice = formatEther(listing.priceInEth) * usdPrice;
  const tokenPrice = fullPrice / Number(listing.bellcoinAmount);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-row space-x-6 justify-between sm:justify-normal">
            <div className="flex flex-row space-x-1 items-center ">
              <Image className="w-6 h-6" src="/bellcoin.png" width={32} height={32} />
              <div className="text-xl font-bold">{listing.bellcoinAmount.toString()} BEL</div>
            </div>
            
            <div className="flex space-x-1 items-center">
              <Image className="w-6 h-6" src="/ethereum.svg" width={32} height={32} />
              <div className="text-xl font-bold text-gray-900">
                {(+formatEther(listing.priceInEth)).toFixed(6)} ETH 
                <span className="text-sm block sm:inline font-medium ml-1">
                  (${fullPrice.toFixed(2)} | ${tokenPrice.toFixed(2)} / BEL)
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-sm truncate">
            <Link 
              href={`https://belscan.io/address/${listing.sellerBellcoinAddress}`} 
              className="text-sm text-gray-700 hover:underline"
              target='_blank'>
              {listing.sellerBellcoinAddress}
            </Link>
          </div>
        </div>
  
        <div className="flex space-x-2 items-center mt-3 sm:mt-0">
          { !listing.isDeposited && !listing.isCancelled &&
          <>
            <span className="text-gray-600 text-sm">Waiting for deposit</span>
          </>
           
          }

          { listing.isCancelled &&
          <>
            <span className="text-red-600 text-sm">Cancelled</span>
          </>
           
          }

          { listing.isDeposited && !listing.isSold && !listing.isCancelled &&
            <Button onClick={onBuy} size="md" scheme="primary">Buy</Button>
          }

          { listing.isSold &&
            <span className="text-green-600 font-bold text-sm">Sold!!</span>
          }
          
        </div>

        
      </div>
      {isAdmin && 
          <div className="flex justify-between items-center border-t border-gray-200 mt-2 pt-2">
            <div className="flex space-x-4">
              <span className="text-gray-600 text-sm">ID: {listing.listingId}</span>
              <span className="text-gray-600 text-sm">Buyer: {listing.buyerBellcoinAddress}</span>
            </div>
            <div className="flex space-x-2 items-center justify-end">
              {!listing.isDeposited && !listing.isCancelled &&
                <Button onClick={() => adminDeposited()} size="sm" scheme="secondary">Deposited</Button>
              }
              {!listing.isFulfilled && listing.isSold &&
                <Button onClick={() => adminFulfilled()} size="sm" scheme="secondary">Fulfill</Button>
              }
              
            </div>
          </div>
          
        }
    </Card>
  )
}