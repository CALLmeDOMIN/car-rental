/* eslint-disable */

// /** app/api/uploadthing/core.ts */
// import { auth } from "@clerk/nextjs";
// import { createUploadthing, type FileRouter } from "uploadthing/next";

// const f = createUploadthing();

// // FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//     // Define as many FileRoutes as you like, each with a unique routeSlug
//     imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
//         async (data) => {
//             // This code RUNS ON YOUR SERVER after upload
//             // alert(
//             //     `Uploaded ${data.file.name} with link ${data.file.url}. Copied to clipboard.`
//             // );
//             // await navigator.clipboard.writeText(data.file.url);
//             console.log(data);
//         }
//     ),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
