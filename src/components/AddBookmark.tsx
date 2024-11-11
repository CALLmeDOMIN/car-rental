"use server";

import { prisma } from "@/../lib/prisma";

export default async function addBookmark({
  userId,
  isBM,
  carId,
  bookmarkId,
}: {
  userId: string;
  isBM: boolean;
  carId: number;
  bookmarkId?: number | null;
}) {
  if (!bookmarkId) bookmarkId = 0;
  if (isBM) {
    await prisma.bookmark.create({
      data: {
        userId: userId,
        carId: carId,
      },
    });
  } else {
    await prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
