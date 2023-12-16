'use client'
import { useState } from 'react'
import { useContractRead } from 'wagmi'
import bellcoinOTCABI from '@/abi/bellcoinOTC.json';
import { Listing } from '@/components/Listing';
import { BuyModal } from './BuyModal';
import { getEthPrice } from '@/utils/getEthPrice';

export const Listings = () => {
  const { data, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'getListings',
    watch: true
  })

  const [showModal, setShowModal] = useState(false);
  const [buyListing, setBuyListing] = useState(null);
  const [buyListingId, setBuyListingId] = useState(null);

  const ethPrice = getEthPrice();

  if(isLoading) {
    return <div></div>
  }

  if(error) {
    return <div>{error.message}</div>
  }

  if(data) {
    return <div className="space-y-3">
      { data.map( (listing, listingIndex) => {
        return <Listing key={listingIndex} usdPrice={ethPrice} listingId={listingIndex} listing={listing} onBuy={() => {
          setShowModal(true); 
          setBuyListing(listing);
          setBuyListingId(listingIndex);
        }} />
      })}

      <BuyModal showModal={showModal} usdPrice={ethPrice} closeModal={() => setShowModal(false)} listing={buyListing} listingId={buyListingId} />
    </div>
  }

  return <div>Loading...</div>

}