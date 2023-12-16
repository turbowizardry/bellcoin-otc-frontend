import { XCircleIcon } from '@heroicons/react/20/solid'

export function ErrorAlert({children}) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3 font-medium text-sm text-red-800 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}