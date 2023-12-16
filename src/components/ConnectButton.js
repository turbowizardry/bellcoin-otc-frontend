'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi'

import { Button } from '@/components/Button';

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button onClick={disconnect} size={'sm'} scheme={'muted'}>{address.substring(0,10)}...</Button>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          //disabled={!connector.ready}
          key={connector.id}
          size={'sm'}
          onClick={() => connect({ connector })}
        >
          Connect Wallet
        </Button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}
