'use client'
 
import { useEffect } from 'react'
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation'

 
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    // return () => {
    //   sessionStorage.setItem("before-hard-reload", url)
    // }
  }, [pathname, searchParams])
 
  return null
}