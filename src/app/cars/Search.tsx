"use client";

import { IconSearch } from "@tabler/icons-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Spinner from "@/components/Spinner";

export function Search() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const search = searchParams.get("search") ?? "";

  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-xs">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <span className="text-text dark:text-darktext sm:text-sm">
          <IconSearch size="16px" aria-label="search" />
        </span>
      </div>
      <input
        type="text"
        // icon={IconSearch}
        className="focus:ring-primary-button-600 block w-full rounded-md border-0 bg-background py-1.5 pl-7 pr-20 text-text ring-1 ring-inset ring-text placeholder:text-text focus:ring-2 focus:ring-inset dark:bg-darkbg dark:text-darktext dark:ring-darktext dark:placeholder:text-darktext sm:text-sm sm:leading-6"
        placeholder="Search"
        spellCheck={false}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />

      {isPending && (
        <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
