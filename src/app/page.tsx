import Image from "next/image";
export default function Home() {
    const tilesArr = [
        ["Trust", "and Reliability"],
        ["Competitive", "Prices"],
        ["Convenient", "Booking"],
        ["Flexibility", "and Customization"],
    ];

    return (
        <>
            <div className="w-full bg-white">
                <div className="relative isolate overflow-hidden py-24 sm:py-32">
                    <Image
                        src={"/bg.jpg"}
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                        width={1920}
                        height={1080}
                    />
                    <div
                        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                        aria-hidden="true"
                    >
                        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-30"></div>
                    </div>
                    <div
                        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                        aria-hidden="true"
                    >
                        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-30"></div>
                    </div>
                    <div className="">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <div className="rounded-r-md bg-neutral-900/[45%]">
                                <h2 className="p-2 px-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                    Welcome to car-rental
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-center">
                <div className="mx-auto w-screen max-w-3xl rounded-md  lg:mx-8">
                    <p className="text-center text-lg leading-8 text-black">
                        Here, we understand the importance of reliable
                        transportation when it comes to exploring new
                        destinations or simply getting around town. Whether
                        you&apos;re a seasoned traveler or a local in need of a
                        temporary set of wheels, we&apos;ve got you covered.
                    </p>
                </div>
            </div>
        </>
    );
    {
        /* 
                
                   <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none lg:px-8">
                        <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            {tilesArr.map((tile) => (
                                <div className="flex flex-col-reverse bg-neutral-900/95 md:rounded-md md:p-4">
                                    <div className="px-6 text-base leading-7 text-gray-300">
                                        {tile[1]}
                                    </div>
                                    <div className="px-6 text-2xl font-bold leading-9 tracking-tight text-white">
                                        {tile[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */
    }
}
1;
