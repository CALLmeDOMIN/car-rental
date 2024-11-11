import { cn } from "@/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md font-semibold transition-all focus:ring-4",
  {
    variants: {
      variant: {
        default: "bg-primary-button text-darkbg hover:bg-primary-button/70",
        outline:
          "bg-transparent text-primary-button border border-primary-button",
        secondary: "bg-darkbg text-darktext hover:bg-darkbg/70",
      },
      size: {
        default: "px-6 py-1.5",
        sm: "px-4 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
