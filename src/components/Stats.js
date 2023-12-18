import { formatEther } from "ethers"

export function Stats({ listings, ethPrice }) {

  const { totalBEL, totalETH, soldBEL, soldETH } = listings.reduce((acc, listing) => {
    if(listing.isDeposited && !listing.isCancelled && !listing.isSold) {
      acc.totalBEL += listing.bellcoinAmount
      acc.totalETH += listing.priceInEth
    }

    if(listing.isSold) {
      acc.soldBEL += listing.bellcoinAmount
      acc.soldETH += listing.priceInEth
    }
    return acc
  }, { totalBEL: 0n, totalETH: 0n, soldBEL: 0n, soldETH: 0n })

  const fullTotalPrice = formatEther(totalETH) * ethPrice;
  const listedBELPrice = fullTotalPrice / Number(totalBEL);
  
  const soldTotalPrice = formatEther(soldETH) * ethPrice;
  const soldBELPrice = soldTotalPrice / Number(soldBEL);

  return (
    <div className="mb-16 grid grid-cols-2 overflow-hidden rounded-xl text-center border border-gray-200 p-4">
      <div className="flex flex-col space-y-1">
        <div className="text-sm font-semibold leading-6 text-gray-600">🔮 Listed BEL 🔮</div>
        <div className="text-3xl font-semibold tracking-tight text-gray-900">
          {totalBEL.toString()} BEL
          <span className="block text-lg font-medium">${listedBELPrice.toFixed(2)} per BEL</span>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <div className="text-sm font-semibold leading-6 text-gray-600">🔥 Sold BEL 🔥</div>
        <div className="text-3xl font-semibold tracking-tight text-gray-900">
          {soldBEL.toString()} BEL
          <span className="block text-lg font-medium">${soldBELPrice.toFixed(2)} per BEL</span>
        </div>
      </div>

    </div>
  )
}