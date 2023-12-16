import { useState } from 'react';

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'

import bellcoinOTCABI from '@/abi/bellcoinOTC.json'
import { parseEther } from "ethers"
import { Button } from '@/components/Button';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { ErrorAlert } from '@/components/ErrorAlert';
import Link from 'next/link';

export default function Create() {
  const [bellcoinAddress, setBellcoinAddress] = useState('');
  const [bellcoinAmount, setBellcoinAmount] = useState('');
  const [price, setPrice] = useState('');

  const { data, isLoading, isSuccess, isError, write, error } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'listDeal',
    args: [
      bellcoinAddress,
      bellcoinAmount,
      price ? parseEther(price) : 0
    ]
  })


  return (
    <main className={`flex flex-col min-h-screen`} >
      <div className="max-w-3xl mx-auto w-full items-center justify-between p-8">
        { isSuccess &&
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Deposit your BEL</h1>
            <div className="flex flex-col space-y-2 py-6 px-8 sm:px-12 border border-gray-200 text-gray-900 rounded-md mb-4">
              <p className='text-xl font-bold'>Send {bellcoinAmount} BEL to the escrow wallet</p>
              <div className="">
                <p className='text-green-700 background-green-50 font-bold border border-green-500 py-2 px-4 rounded-md text-center'>{process.env.NEXT_PUBLIC_BELLCOIN_ADDRESS}</p>
                <Link href={`https://belscan.io/address/${process.env.NEXT_PUBLIC_BELLCOIN_ADDRESS}`} target='_blank'><p className="text-sm text-gray-700 underline text-center mt-1">View escrow contract</p></Link>
              </div>
              
              <p className='text-gray-700 text-sm'>Make sure you send the exact amount of BEL as this listing, otherwise your BEL may be lost.</p>
              <p className='text-gray-700 text-sm'>It may take a few minutes to verify and update your listing, please be patient or contact us in the Discord.</p>
              <p className='text-gray-700 text-sm'>You can cancel your listing and have your BEL returned for a 5% fee in BEL.</p>
              
            </div>

            <Link href="/listings" className="flex justify-end">
              <Button>Go to your listings</Button>
            </Link>
            
          </>
        }

        { !isSuccess &&
          <>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create listing</h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              BEL Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="bellcoinAddress"
                id="bellcoinAddress"
                value={bellcoinAddress}
                onChange={(e) => setBellcoinAddress(e.target.value)}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              BEL Amount
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="bellcoinAmount"
                id="bellcoinAmount"
                value={bellcoinAmount}
                onChange={(e) => setBellcoinAmount(e.target.value)}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              ETH Price
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="">
            <Button onClick={() => write()} disabled={isLoading} size="md" scheme="primary">
              <span className="flex items-center">
                <span>Create listing</span>
                {isLoading && <ArrowPathIcon className="animate-spin h-5 w-5 ml-3" />}
              </span>
              
            </Button>
          </div>

          { isError &&
            <ErrorAlert>
              {error?.message}
            </ErrorAlert>
          }
        </div>
        </>
        }
      </div>
      
    </main>
  )
}