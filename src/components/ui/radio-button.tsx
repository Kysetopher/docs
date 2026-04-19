import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function RadioButton({ className, label, ...props }: RadioButtonProps) {
  return (
    <label className={cn("flex items-start gap-3 rounded-md border border-border p-3 text-sm leading-relaxed", className)}>
      <input type="radio" className="mt-0.5 h-4 w-4" aria-label={label} {...props} />
      <span>{label}</span>
    </label>
  );
}
