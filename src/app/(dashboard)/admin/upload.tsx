"use client";

import { Uploader } from "@/utils/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 shadow-md">
      <Uploader
        endpoint="imageUploader"
        onClientUploadComplete={(res: { url: string }[]) => {
          // Do something with the response
          console.log("Files: ", res);
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
