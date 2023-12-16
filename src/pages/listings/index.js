
import { SellerListings } from '@/components/SellerListings';
import Link from 'next/link'
export default function Index() {
  return (
    <main className={`flex flex-col min-h-screen`}>
    
      <div className="max-w-3xl mx-auto w-full items-center justify-between p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Your listings</h1>
          <Link href="/listings/create" className='bg-indigo-500 hover:bg-indigo-600 border-transparent py-2 px-3 text-white focus-visible:outline-indigo-600 rounded font-medium shadow-sm border'>Create Listing</Link>
        </div>
        
        <SellerListings />
      </div>
      
    </main>
  )
}