import { Card } from '@/components/Card'
import { Button } from '@/components/Button'

import { formatEther } from "ethers"
import Image from 'next/image'
import Link from 'next/link'


export function Listing({ listing, onBuy }) {
  //console.log(listing);

  return (
    <Card>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-row space-x-1 items-center">
              <Image className="w-6 h-6" src="/bellcoin.png" width={32} height={32} />
              <div className="text-xl font-bold">{listing.bellcoinAmount.toString()} BEL</div>
            </div>
            
            <div className="flex space-x-1 items-center">
              <Image className="w-6 h-6" src="/ethereum.svg" width={32} height={32} />
              <div className="text-xl font-bold">{formatEther(listing.priceInEth)} ETH</div>
            </div>
          </div>

          <div className="">
            <Link 
              href={`https://belscan.io/address/${listing.sellerBellcoinAddress}`} 
              className="text-sm truncate text-ellipsis text-gray-700 hover:underline"
              target='_blank'>
              {listing.sellerBellcoinAddress}
            </Link>
          </div>
        </div>
  
        <div className="flex space-x-2 items-center">
          { !listing.isDeposited &&
          <>
            <span className="text-gray-600 text-sm">Waiting for deposit</span>
          </>
           
          }

          { listing.isDeposited && !listing.isSold &&
            <Button onClick={onBuy} size="md" scheme="primary">Buy</Button>
          }

          { listing.isSold &&
            <span className="text-green-600 font-bold text-sm">Sold!!</span>
          }
          
        </div>
      </div>
    </Card>
  )
}