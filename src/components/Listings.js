'use client'
import { useState } from 'react'
import { useContractRead } from 'wagmi'
import bellcoinOTCABI from '@/abi/bellcoinOTC.json';
import { Listing } from '@/components/Listing';
import { BuyModal } from './BuyModal';

export const Listings = () => {
  const { data, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'getListings'
  })

  const [showModal, setShowModal] = useState(false);
  const [buyListing, setBuyListing] = useState(null);
  const [buyListingId, setBuyListingId] = useState(null);

  if(isLoading) {
    return <div></div>
  }

  if(error) {
    return <div>{error.message}</div>
  }

  if(data) {
    return <div>
      { data.map( (listing, listingIndex) => {
        return <Listing listing={listing} onBuy={() => {
          setShowModal(true); 
          setBuyListing(listing);
          setBuyListingId(listingIndex);
        }} />
      })}

      <BuyModal showModal={showModal} closeModal={() => setShowModal(false)} listing={buyListing} listingId={buyListingId} />
    </div>
  }

  return <div>Loading...</div>

}