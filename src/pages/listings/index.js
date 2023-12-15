
import { SellerListings } from '@/components/SellerListings';

export default function Index() {
  return (
    <main
      className={`flex flex-col min-h-screen`}
    >
      
      
      <div className="max-w-3xl mx-auto w-full items-center justify-between p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your listings</h1>
        <SellerListings />
      </div>
      
    </main>
  )
}