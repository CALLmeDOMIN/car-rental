import { Filter } from "./filter";
import { Search } from "./search";
import { IconBookmarkFilled } from "@tabler/icons-react";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="mt-4 flex items-center justify-center">
        <Search />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:flex lg:w-1/4 lg:p-4">
          <Filter />
        </div>
        <div className="mx-auto flex justify-center md:mt-5 lg:w-3/4">
          <div className="grid max-w-md gap-4 p-4 pt-0 md:max-w-3xl md:grid-cols-2 md:pt-4 lg:max-w-4xl xl:max-w-7xl 2xl:grid-cols-3">
            {new Array(9).fill(69).map((_, i) => (
              <CarTileLoading key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const CarTileLoading = () => {
  return (
    <>
      <div className="relative isolate overflow-hidden rounded-2xl shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
        <div className="flex flex-col p-4 pt-0">
          <div className="flex items-center gap-2 p-2">
            <div className="mr-2 flex aspect-square items-center">
              <div className="aspect-square h-12 rounded-full bg-rose-100/20 shadow-md"></div>
            </div>
            <div className="flex grow flex-col gap-1">
              <div className="h-7 w-24 rounded-md bg-rose-100/10"></div>
              <div className="h-5 w-12 rounded-md bg-rose-100/20"></div>
            </div>
            <div className="aspect-square text-rose-100/5">
              <IconBookmarkFilled aria-label="bookmark" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="relative min-h-[150px] min-w-[280px] grow">
              <div className="h-36 w-72 rounded-3xl bg-rose-100/10"></div>
            </div>
            <div className="flex flex-col items-end justify-end gap-1">
              <div className="aspect-square h-6 rounded-full bg-rose-100/20 shadow-md"></div>
              <div className="aspect-square h-6 rounded-full bg-rose-100/10 shadow-md"></div>
              <div className="aspect-square h-6 rounded-full bg-rose-100/20 shadow-md"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 rounded-b-2xl p-2 pl-4">
          <div className="h-12 w-44 grow rounded-2xl bg-rose-100/20"></div>
          <div className="flex items-end">
            <div className="h-10 w-28 rounded-2xl bg-rose-100/10"></div>
          </div>
        </div>
      </div>
    </>
  );
};
