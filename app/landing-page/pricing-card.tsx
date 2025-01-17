"use client";
import { Button } from "@/components/ui/button";
import { PricingPlan } from "./pricing-section";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PricingCard({ title, price, description, features, isPopular, url }: PricingPlan){
  const router = useRouter();

  const onClick = () => {
    router.push(url);
  }

  return (
    <div className="hover:border-blue-500  border flex flex-col justify-between rounded-lg h-full p-6 hover:shadow-md text-left relative">
      {
        isPopular && (
          <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-lg rounded-tr-lg">
            <b>Popular</b>
          </div>
        )
      }
      <div>
        <div className="inline-flex items-end">
          <h1 className="font-extrabold text-3xl">${price}</h1>
        </div>
        <h2 className="font-bold text-xl my-2">
          {title}
        </h2>
        <p>{description}</p>
        <div className="flex-grow border-t border-white opacity-50 my-5"></div>
        <ul >
          {
            features.map((feature, index) => (
              <li key={index} className="flex flex-row items-center  gap-2 my-2 ">
                <div className="rounded-full flex items-center justify-center w-4 h-4 ">
                  <Check className="border-blue-500text-white" width={10} height={10} />
                </div>
                <p>{feature}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <Button onClick={onClick} className="text-lg py-2 mt-3 rounded-lg  w-full">Select Plan </Button>
        
      </div>
    </div>
  )
}