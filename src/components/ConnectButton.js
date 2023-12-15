'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi'

import { Button } from '@/components/Button';

export function ConnectButton() {
  const { isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button onClick={disconnect} size={'sm'} scheme={'muted'}>Disconnect</Button>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
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
