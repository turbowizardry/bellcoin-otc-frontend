
import { Listings } from '@/components/Listings';
import Link from 'next/link';
export default function Home() {
  return (
    <main className={`flex flex-col`}>
      
      <div className="max-w-3xl mx-auto w-full items-center justify-between p-8">
        <div className="text-center pb-16 my-8 sm:my-16 border-b border-gray-200">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Buy and sell BEL with ETH
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Experience effortless OTC trading on BelSwap. Secure, private, and direct large-volume trades at your fingertips.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link href="/listings/create" 
              className='bg-indigo-500 hover:bg-indigo-600 border-transparent py-2 px-3 text-white focus-visible:outline-indigo-600 rounded-md font-medium shadow-lg border text-lg'>
                Create Listing
                </Link>
          </div>
        </div>
        <Listings />
      </div>
      
    </main>
  )
}