import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandHeartProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export function BrandHeart({ className, size = "md" }: BrandHeartProps) {
  return (
    <Heart 
      className={cn(sizeClasses[size], "text-foreground", className)} 
      strokeWidth={1.5}
    />
  );
}
