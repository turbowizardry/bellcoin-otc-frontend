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

  const ethPrice = GetEthPrice();

  if(isLoading) {
    return <></>
  }

  if(error) {
    return <div>{error.message}</div>
  }

  function compareListings(a, b) {
    // First, compare based on the isSold flag
    if (a.isSold && !b.isSold) {
        return 1;
    } else if (!a.isSold && b.isSold) {
        return -1;
    }

    // If both have the same isSold status, then sort by price
    const priceA = BigInt(a.priceInEth) / BigInt(a.bellcoinAmount);
    const priceB = BigInt(b.priceInEth) / BigInt(b.bellcoinAmount);

    if (priceA > priceB) {
      return 1;
    } else if (priceA < priceB) {
      return -1;
    } else {
      return 0;
    }   
  }


  if(data) {
    let listings = data.map( (listing, listingIndex) => {
      return { ...listing, listingId: listingIndex }
    });

    if( !isAdmin ) {
      listings.sort(compareListings);
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

        </div>

        <BuyModal showModal={showModal} usdPrice={ethPrice} closeModal={() => setShowModal(false)} listing={buyListing} />
      </div>
    )
  }

  return <></>

}