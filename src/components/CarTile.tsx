"use client";

import { IconBookmarkFilled, IconBookmarkPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import addBookmark from "./AddBookmark";
import { logos } from "@/utils/data";

export default function CarTile({
  imageUrl,
  brand,
  name,
  className,
  isBookmarked,
  carId,
  displayBookmark = true,
  displayColors = true,
}: {
  imageUrl: string;
  brand: string;
  name: string;
  className?: string;
  isBookmarked?: number | null;
  carId: number;
  displayBookmark?: boolean;
  displayColors?: boolean;
}) {
  const [bookmark, setBookmark] = useState(
    isBookmarked === null ? false : true,
  );

  const router = useRouter();

  const { user } = useUser();

  const handleBookmarks = () => {
    if (!user?.id) {
      router.push("/sign-in");
      return;
    }
    setBookmark(!bookmark);

    addBookmark({
      userId: user?.id,
      isBM: !bookmark,
      carId: carId,
      bookmarkId: isBookmarked,
    });
  };

  return (
    <div className={"flex flex-col p-4 pt-0 " + className}>
      <div className="flex items-center gap-2 p-2">
        <div className="mr-2 flex aspect-square items-center rounded-full bg-accent p-1">
          {logos[brand.toLowerCase()]}
        </div>
        <div className="flex grow flex-col">
          <h1 className="text-xl font-semibold text-text dark:text-darktext">
            {brand}
          </h1>
          <h1 className="font-semibold text-gray-500">{name}</h1>
        </div>
        <button
          onClick={() => handleBookmarks()}
          className="aspect-square text-text dark:text-darktext"
        >
          {bookmark ? (
            <IconBookmarkFilled
              aria-label="bookmark"
              className="text-yellow-500"
            />
          ) : displayBookmark ? (
            <IconBookmarkPlus aria-label="add bookmark" />
          ) : null}
        </button>
      </div>
      <div className="flex gap-3">
        <div className="relative min-h-[150px] min-w-[280px] grow">
          <Image
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px): 50vw, 33vw"
            alt="car image"
            className="aspect-video rounded-3xl object-cover object-center shadow-lg"
          />
        </div>
        {displayColors ? (
          <div className="flex flex-col items-end justify-end gap-1">
            <div className="aspect-square h-6 rounded-full border bg-white shadow-md"></div>
            <div className="aspect-square h-6 rounded-full bg-primary-button shadow-md"></div>
            <div className="aspect-square h-6 rounded-full bg-yellow-400 shadow-md"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
