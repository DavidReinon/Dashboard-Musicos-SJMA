// app/providers.tsx
"use client";

import { SelectionProvider } from "@/src/contexts/selections/createSelectionContext";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <SelectionProvider>{children}</SelectionProvider>
        </NextUIProvider>
    );
}
