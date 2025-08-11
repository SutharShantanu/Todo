import * as React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";

type InputProps = React.ComponentProps<"input"> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

function Input({ className, type, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "flex items-center w-full min-w-0 rounded-md border border-input bg-transparent",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0",
        className
      )}
    >
      {leftIcon && (
        <>
          <span className="flex items-center pl-2 h-9 text-muted-foreground">
            {leftIcon}
          </span>
          <Separator orientation="vertical" className="!h-9 mx-2" />
        </>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "flex-1 h-9 bg-transparent text-base outline-none transition-all",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-transparent",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm"
        )}
        {...props}
      />

      {rightIcon && (
        <>
          <Separator orientation="vertical" className="!h-9 mx-2" />
          <span className="flex items-center px-2 h-9 text-muted-foreground">
            {rightIcon}
          </span>
        </>
      )}
    </div>
  );
}

export { Input };
