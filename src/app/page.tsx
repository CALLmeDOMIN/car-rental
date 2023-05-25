import Image from "next/image";
export default function Home() {
    return (
        <div className="h-screen w-full bg-neutral-900">
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <Image
                    src={"/2.jpg"}
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
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <div className="rounded-r-md bg-neutral-900/95">
                            <h2 className="p-2 px-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Welcome to car-rental
                            </h2>
                        </div>
                        <div className="w-screen rounded-md  bg-neutral-900/95 lg:mx-8">
                            <p className="mt-6 w-2/3 p-2 px-6 text-lg leading-8 text-gray-100">
                                Here, we understand the importance of reliable
                                transportation when it comes to exploring new
                                destinations or simply getting around town.
                                Whether you`&apos;`re a seasoned traveler or a local in
                                need of a temporary set of wheels, we`&apos;`ve got you
                                covered.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none lg:px-8">
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col-reverse bg-neutral-900/95 md:rounded-md md:p-4">
                                <dt className="px-6 text-base leading-7 text-gray-300">
                                    and Reliability
                                </dt>
                                <dd className="px-6 text-2xl font-bold leading-9 tracking-tight text-white">
                                    Trust
                                </dd>
                            </div>
                            <div className="flex flex-col-reverse bg-neutral-900/95 md:rounded-md md:p-4">
                                <dt className=" px-6 text-base leading-7 text-gray-300">
                                    Prices
                                </dt>
                                <dd className=" px-6 text-2xl font-bold leading-9 tracking-tight text-white">
                                    Competitive
                                </dd>
                            </div>
                            <div className="flex flex-col-reverse bg-neutral-900/95 md:rounded-md md:p-4">
                                <dt className="px-6 text-base leading-7 text-gray-300">
                                    Booking
                                </dt>
                                <dd className="px-6 text-2xl font-bold leading-9 tracking-tight text-white">
                                    Convenient
                                </dd>
                            </div>
                            <div className="flex flex-col-reverse bg-neutral-900/95 md:rounded-md md:p-4">
                                <dt className="px-6 text-base leading-7 text-gray-300">
                                    and Customization
                                </dt>
                                <dd className="px-6 text-2xl font-bold leading-9 tracking-tight text-white">
                                    Flexibility
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
1;
