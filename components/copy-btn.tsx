"use client";
import { Check, Clipboard} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react";


export default function CopyBtn({ text }: {
  text: string
}) {
  const timeout = 1000;
  const [isCopied, setIsCopied] = React.useState(false)
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    }, console.error)
}

return (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={() => copyToClipboard(text)} className="text-blue-500 hover:text-white absolute p-2 right-0 top-0">{isCopied ? <Check /> : <Clipboard />}</button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy code</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

)
}
