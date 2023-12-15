'use client'

import { useAccount } from 'wagmi'
import { useContractRead } from 'wagmi'

import bellcoinOTCABI from '@/abi/bellcoinOTC.json';

import { SellerListing } from '@/components/SellerListing';

export const SellerListings = () => {
  const { address } = useAccount()

  const { data, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'getSellerListingIds',
    args: [address]
  })

  if(isLoading) {
    return <div></div>
  }

  if(error) {
    return <div>{error.message}</div>
  }

  if(data) {
    return <div>
      { data.map( (listingId) => {
        return <SellerListing key={listingId} listingId={listingId} />
      })}
    </div>
  }

  return <div>Loading...</div>

}