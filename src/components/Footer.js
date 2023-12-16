import Link from "next/link"

const navigation = {
  main: [
    { name: 'Escrow Contract', href: `https://belscan.io/address/${process.env.NEXT_PUBLIC_BELLCOIN_ADDRESS}`, target: '_blank' },
    { name: 'FAQ', href: '/faq', target: '_self' },
    { name: 'Your listings', href: '/listings', target: '_self' },
    { name: 'Discord', href: 'https://discord.gg/EtWj5MFk', target: '_blank' },
    { name: 'Github', href: 'https://github.com/turbowizardry/bellcoin-otc-contracts', target: '_blank' }
  ]
}

export function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} target={item.target} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  )
}
