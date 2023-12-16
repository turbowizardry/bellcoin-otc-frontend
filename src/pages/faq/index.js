const hows = [
  {
    id: 1,
    question: "1. Create a Listing",
    answer:
      "The seller begins by creating a listing on BELSwap.",
  },
  {
    id: 1,
    question: "2. Deposit BEL Tokens",
    answer:
      "Once the listing is created, the seller deposits the required BEL tokens into the escrow wallet.",
  },
  {
    id: 1,
    question: "3. Mark as Deposited",
    answer:
      "After the deposit is received, the listing on the smart contract will be marked as deposited. This action ensures the listing goes live, making it available for purchases with ETH.",
  },
  {
    id: 1,
    question: "4. Purchase and Transfer",
    answer:
      "Upon a successful purchase, the administrator transfers the full amount of BEL tokens from the escrow wallet directly to the buyer's wallet, as specified in the smart contract.",
  },
  {
    id: 1,
    question: "5. Record Keeping",
    answer:
      "Once the BEL token transfer is completed, the administrator marks the listing as fulfilled. This step is essential for maintaining accurate records and ensuring transparency in transactions.",
  }
]

const faqs = [
  {
    id: 1,
    question: "Question",
    answer:
      "Answer",
  },
  // More questions...
]

export default function Faq() {
  return (
    <div className="">
      <div className="mx-auto max-w-5xl ">
        <div className="divide-y divide-gray-900/10 px-6 py-24">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900">How it works</h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {hows.map((faq) => (
              <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">{faq.question}</dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="divide-y divide-gray-900/10 px-6 py-24">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">{faq.question}</dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
