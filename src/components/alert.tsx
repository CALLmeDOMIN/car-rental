"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";

export default function Alert() {
  return (
    <button
      className="absolute bottom-0 right-0 p-1.5 pr-2 text-accent dark:text-background"
      onClick={() => alert("Thank you for subscribing!")}
    >
      <IconArrowNarrowRight size={24} aria-label="arrow right" />
    </button>
  );
}
