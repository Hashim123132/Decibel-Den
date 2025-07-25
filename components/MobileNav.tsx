'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from "react"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Sun, Moon } from "lucide-react"
import Link from "next/link"

export const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = () => setOpen(false)

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>

          <nav className="mobilenav flex flex-col gap-4">
            <Link href="/" onClick={handleClose}>Home</Link>
            <Link href="/ProductDisplayPage" onClick={handleClose}>Products</Link>
            <Link href="/Headphones" onClick={handleClose}>Headphones</Link>
            <Link href="/Speakers" onClick={handleClose}>Speakers</Link>
          </nav>

          <div className="darkmode">
            <Button
              variant="ghost"
              className='text-xl'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
