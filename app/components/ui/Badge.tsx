import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ring-primary hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground ring-secondary hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground ring-destructive hover:bg-destructive/80",
        outline: "text-foreground ring-border bg-transparent hover:bg-accent",
        success: "bg-emerald-100 text-emerald-800 ring-emerald-800/10 hover:bg-emerald-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
