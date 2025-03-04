import { Button } from "@/components/ui/button";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import Link from "next/link";
import { LogIn, Github, Flame } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="grow">
      <div className="container mx-auto px-4 mb-24 mt-4 flex flex-col md:flex-row justify-center gap-20">
        <div className="flex flex-col max-w-sm justify-center ">
          <div className="mb-8">
            <h1 className="mb-5 text-4xl font-extrabold leading-tight">Get Feedbacks with no hassles</h1>
            <p className="text-gray-300 texl-lg">Connect <i>Pidbaq</i> to your website and get feedbacks from your customers <strong className="text-white">right now</strong>.</p>
          </div>

          <div>
            <SignedOut>
              <SignUpButton>
                <div className="flex gap-3">
                  <Button className="font-bold">
                    <Flame className="mr-1" />
                    Get Started</Button>
                </div>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link></Button>
            </SignedIn>
          </div>
        </div>
        <div className="flex-1 max-w-lg" style={{ borderRadius: '30px', overflow: 'hidden' }}>
          {/* <Image src={'/demo.gif'} alt="demo" layout={'responsive'} width={155} height={155} unoptimized={true} /> */}
        </div>
      </div>
    </section>
  )
}