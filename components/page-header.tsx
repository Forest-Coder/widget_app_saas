import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {CreditCard, Folder } from 'lucide-react';

const PageHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all backdrop-blur-3xl">
      <div className="w-full  px-2.5 lg:px-20 relative mx-auto border-b border-[#202020]">
        <div className="flex flex-row h-14 items-center justify-between">
        <Link href="/dashboard" className='flex flex-row mx-2 hover:text-blue-500'><Image src="/logo.png" alt="Logo" width={120} height={120} /> </Link>
          <div>
            <SignedOut>
              <SignInButton>
                <span className="mx-1 hover:cursor-pointer  hover:text-blue-500">Sign In</span>
              </SignInButton>
              <span className='mx-1 text-gray-500'>|</span>
              <SignUpButton>
                <span className="mx-1 hover:cursor-pointer  hover:text-blue-500">Sign Up</span>
              </SignUpButton>
            </SignedOut>
            <SignedIn >
              <div className='flex flex-row '>
                <Link href="/dashboard" className='flex flex-row mx-2 hover:text-blue-500'>

                  <Folder className='flex mr-1' />
                  <span className='flex'>Projects</span>
                </Link>

                <Link href="/payments" className='flex flex-row mx-2 hover:text-blue-500' >
                  <CreditCard className='flex mr-1' />
                  <span className='flex'>Billing</span>
                </Link>
                <UserButton />
              </div>



            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}

export default PageHeader;