'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const StripeSuccessToast = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment successful!')
    }
  }, [searchParams])

  return null
}

export default StripeSuccessToast
