"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

interface TooltipProps {
  children: React.ReactNode
  delayDuration?: number
}

const TooltipProvider: React.FC<TooltipProps> = ({
  children,
  delayDuration = 300,
}) => {
  return <>{children}</>
}

interface TooltipTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  children,
  asChild = false,
}) => {
  return (
    <div className="inline-block">
      {asChild ? children : <button>{children}</button>}
    </div>
  )
}

interface TooltipContentProps {
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

const TooltipContent: React.FC<TooltipContentProps> = ({
  children,
  side = "top",
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute z-50 px-3 py-1.5 text-sm bg-background border border-slate-800 rounded shadow-md",
        {
          "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1": side === "top",
          "top-1/2 right-full transform -translate-y-1/2 -translate-x-1": side === "left",
          "top-full left-1/2 transform -translate-x-1/2 translate-y-1": side === "bottom",
          "top-1/2 left-full transform -translate-y-1/2 translate-x-1": side === "right",
        },
        className
      )}
    >
      {children}
    </div>
  )
}

interface TooltipRootProps {
  children: React.ReactNode
  delayDuration?: number
}

const Tooltip: React.FC<TooltipRootProps> = ({
  children,
  delayDuration = 300,
}) => {
  return <div className="relative inline-block">{children}</div>
}

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} 