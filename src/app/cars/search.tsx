"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export function Search() {
    let { replace } = useRouter();
    let pathname = usePathname();

    let [isPending, startTransition] = useTransition();

    let handleSearch = (term: string) => {
        let params = new URLSearchParams(window.location.search);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        params.delete("page");

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="relative max-w-[45ch]">
            <input
                type="text"
                // icon={IconSearch}
                className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Search"
                spellCheck={false}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />

            {isPending && (
                <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900" />
                </div>
            )}
        </div>
    );
}
