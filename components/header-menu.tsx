"use client";
import { Folder, CreditCard } from 'lucide-react';

import Link from "next/link";

const HeaderMenu = () => {
  return (
    <div className=' '>
      
      <Link href="/dashboard" className="mx-2 hover:text-blue-500">
        <Folder className="mr-1  w-5" /><span>Projects</span>
      </Link>
      <Link href="/payments" className="mx-2 hover:text-blue-500">
        <CreditCard className="mr-1  w-5" /><span>Billing</span>
      </Link>

    </div>

  )
}

export default HeaderMenu;

