'use client'

import { useState } from "react"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

export const MobileNav = () => {
  const [open, setOpen] = useState(false)

  // When a link is clicked, close the Sheet
  const handleClose = () => setOpen(false)

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

          <nav className="mobilenav">
            <Link href="/" onClick={handleClose}>Home</Link>
            <Link href="/ProductDisplayPage" onClick={handleClose}>Products</Link>
            <Link href="/Headphones" onClick={handleClose}>Headphones</Link>
            <Link href="/Speakers" onClick={handleClose}>Speakers</Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
