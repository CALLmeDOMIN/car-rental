import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-[80vh] flex-col lg:flex-row">
      <div className="flex flex-col items-center justify-center lg:w-3/5">
        <SignIn afterSignInUrl={"/"} />
      </div>
      <div className="m-4 hidden min-h-[80vh] max-w-md sm:mx-auto sm:w-full lg:block lg:w-2/5">
        <div className="relative min-h-[80vh] w-full">
          <Image
            src={"/signin.jpg"}
            fill
            sizes="100vw, (max-width: 1023px): 40vw"
            alt="Car image"
            className="rounded-2xl object-cover object-center duration-300 ease-in-out hover:scale-105"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
