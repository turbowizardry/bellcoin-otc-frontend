import { useState } from 'react'
import { useContractRead, useAccount } from 'wagmi'
import bellcoinOTCABI from '@/abi/bellcoinOTC.json';
import { Listing } from '@/components/Listing';
import { BuyModal } from './BuyModal';
import { GetEthPrice } from '@/utils/GetEthPrice';
import { Stats } from '@/components/Stats';

export const Listings = () => {
  const { data, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'getListings',
    watch: true
  })

  const { address } = useAccount()
  const isAdmin = (address == process.env.NEXT_PUBLIC_CONTRACT_OWNER);

  const [showModal, setShowModal] = useState(false);
  const [buyListing, setBuyListing] = useState(null);
  const [buyListingId, setBuyListingId] = useState(null);

  const ethPrice = GetEthPrice();

  if(isLoading) {
    return <div></div>
  }

  if(error) {
    return <div>{error.message}</div>
  }

  function compareBySold(a, b) {
    return (a.isSold === b.isSold)? 0 : b.isSold? -1 : 1;
  }

  if(data) {
    let listings = data.map( (listing, listingIndex) => {
      return { ...listing, listingId: listingIndex }
    });

    if( !isAdmin ) {
      listings.sort(compareBySold);
    }
    
    
    return (
      <div>
        <Stats listings={data} ethPrice={ethPrice} />
      
        <div className="space-y-3">
      
          { listings.map( (listing, listingIndex) => {
            return <Listing key={listingIndex} usdPrice={ethPrice} listing={listing} onBuy={() => {
              setShowModal(true); 
              setBuyListing(listing);
            }} />
          })}

          <BuyModal showModal={showModal} usdPrice={ethPrice} closeModal={() => setShowModal(false)} listing={buyListing} />
        </div>
      </div>
    )
  }

  return <div>Loading...</div>

}