"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * Two bars drawn with spans rather than an icon component: collapsing only the
 * vertical one animates a plus into a minus, with no swap between two icons and
 * nothing to flicker mid-transition. Decorative, so it stays out of the
 * accessibility tree - Radix already exposes the state via aria-expanded.
 */
const AccordionPlusIcon = () => (
  <span
    aria-hidden="true"
    className="relative ml-4 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
  >
    <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current" />
    <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-200 ease-out group-data-[state=open]:scale-y-0" />
  </span>
)

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-colors hover:underline",
        className
      )}
      {...props}
    >
      {children}
      <AccordionPlusIcon />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
