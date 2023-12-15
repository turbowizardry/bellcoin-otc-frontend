import { Header } from '@/components/Header';
import { Listings } from '@/components/Listings';

export default function Home() {
  return (
    <main
      className={`flex flex-col min-h-screen`}
    >
      <Header />
      <div className="max-w-3xl mx-auto w-full items-center justify-between p-8">
        <Listings />
      </div>
      
    </main>
  )
}