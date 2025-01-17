"use client"
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LandingPage from "./landing-page";
import Footer from "./landing-page/footer"
import { useUser } from "@clerk/clerk-react";
import { redirect } from "next/navigation";
export default function Home() {
  const { isSignedIn } = useUser()
  if (isSignedIn) {
    redirect('/dashboard')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LandingPage />
      <Footer />
    </main>
  );
}
