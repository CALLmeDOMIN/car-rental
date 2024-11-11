import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ClassValues = ClassValue[];

export function cn(...inputs: ClassValues) {
  return twMerge(clsx(inputs));
}
