"use client";

import { IconSearch } from "@tabler/icons-react";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import Spinner from "../components/spinner";

export function Search() {
    let { replace } = useRouter();
    let pathname = usePathname();

    let [isPending, startTransition] = useTransition();

    let handleSearch = (term: string) => {
        let params = new URLSearchParams(location.search);
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
        <div className="relative max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <span className="text-gray-500 sm:text-sm">
                    <IconSearch size="16px" aria-label="search" />
                </span>
            </div>
            <input
                type="text"
                // icon={IconSearch}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search"
                spellCheck={false}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />

            {isPending && (
                <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
                    <Spinner />
                </div>
            )}
        </div>
    );
}
