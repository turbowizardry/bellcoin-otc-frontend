import { useContractRead, useContractWrite } from 'wagmi'

import { Card } from '@/components/Card'
import { Button } from '@/components/Button'

import bellcoinOTCABI from '@/abi/bellcoinOTC.json'

import { formatEther } from "ethers"
import Image from 'next/image'
import Link from 'next/link'


export function SellerListing({listingId}) {
  const { data, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'listings',
    args: [listingId],
    watch: true
  })

  const { write: cancelWrite } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'cancelListing',
    args: [
      listingId
    ]
  })

  if(isLoading) {
    return <div></div>
  }

  if(error) {
    return <div>{error.message}</div>
  }


  if(data) {
    console.log(data);
    return (
      <Card>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row space-x-4">
              <div className="flex flex-row space-x-1 items-center">
                <Image className="w-6 h-6" src="/bellcoin.png" width={32} height={32} />
                <div className="text-xl font-bold">{data[3].toString()} BEL</div>
              </div>
              
              <div className="flex space-x-1 items-center">
                <Image className="w-6 h-6" src="/ethereum.svg" width={32} height={32} />
                <div className="text-xl font-bold">{formatEther(data[4])} ETH</div>
              </div>
            </div>
  
            <div className="">
              <Link 
                href={`https://belscan.io/address/${data[1]}`} 
                className="text-sm truncate text-ellipsis text-gray-700 hover:underline"
                target='_blank'>
                {data[1]}
              </Link>
            </div>
          </div>
    
          <div className="flex space-x-2 items-center">
            { !data[5] &&
            <>
              <span className="text-gray-600 text-sm">Waiting for deposit</span>
            </>
             
            }
  
            { !data[6] && !data[7] && !data[8] &&
              <>
                <Button onClick={() => cancelWrite()} size="md" scheme="primary">Cancel</Button>
              </>
            }

            { data[8] &&
            <>
              <span className="text-gray-600 text-sm">Cancelled</span>
            </>
             
            }
  
          </div>
        </div>
      </Card>
    )
  }

  return <div>Loading...</div>

  
}