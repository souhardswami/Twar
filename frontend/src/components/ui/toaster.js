// src/components/ui/toaster.tsx
"use client";

import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-end",
  max: 3, // max visible toasts
});

export function Toaster() {
  return <toaster.Root />;
}
