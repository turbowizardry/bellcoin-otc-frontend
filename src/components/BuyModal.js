import { useState } from 'react';
import { Button } from '@/components/Button';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ErrorAlert } from '@/components/ErrorAlert';

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'

import bellcoinOTCABI from '@/abi/bellcoinOTC.json'
import { formatEther } from "ethers"

export function BuyModal({showModal, closeModal, listing}) {
  const [address, setAddress] = useState('');

  const { data, isLoading, isSuccess, isError, write, error } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: bellcoinOTCABI,
    functionName: 'purchaseDeal',
    args: [
      listing ? listing.listingId : "",
      address
    ],
    value: listing ? listing.priceInEth : 0
  })
 
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => closeModal()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  {listing &&
                    <div className="my-3 text-left">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        Buy {listing.bellcoinAmount.toString()} BEL for {formatEther(listing.priceInEth)} ETH
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Enter your Bellcoin address to receive the BEL. Make sure this is correct, we cannot recover your BEL if you enter the wrong address.
                        </p>

                        <div className="mt-3">
                          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            BEL Address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="address"
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                {isError &&
                  <ErrorAlert>
                    {error?.message}
                  </ErrorAlert>
                }
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:gap-x-2">
                  <Button onClick={() => write()} disabled={isLoading || address.length != 34} size="md" scheme="primary">Buy {listing.bellcoinAmount.toString()} BEL for {formatEther(listing.priceInEth)} ETH</Button>
                  <Button onClick={() => closeModal()} size="md" scheme="muted">Cancel purchase</Button>
                </div>

               
              </div>
            </div>
          </div>
          <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}