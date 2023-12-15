import { useState } from 'react';

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'

import bellcoinOTCABI from '@/abi/bellcoinOTC.json'
import { parseEther } from "ethers"
import { Button } from '@/components/Button';
export default function Create() {
  const [bellcoinAddress, setBellcoinAddress] = useState('');
  const [bellcoinAmount, setBellcoinAmount] = useState('');
  const [price, setPrice] = useState('');

  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
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
            <Button onClick={() => write()} disabled={isLoading} size="md" scheme="primary">Create listing</Button>
          </div>

        </div>
      </div>
      
    </main>
  )
}