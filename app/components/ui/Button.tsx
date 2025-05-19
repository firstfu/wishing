"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none", {
  variants: {
    variant: {
      default: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-secondary text-white hover:bg-secondary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, isLoading, children, ...props }, ref) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <span className="mr-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
