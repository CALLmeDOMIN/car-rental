import Image from 'next/image'
import Form from './form'

export default function Page() {
    return (
        <div className="flex min-h-[80vh] flex-col lg:flex-row">
            <h1 className="mb-4 text-center text-4xl font-semibold lg:hidden">
                Get <span className="text-accent">in touch</span>
            </h1>
            <div className="m-4 min-h-[80vh] max-w-md overflow-hidden rounded-2xl sm:mx-auto sm:w-full lg:w-2/5 xl:w-2/6">
                <div className="relative min-h-[80vh] w-full">
                    <Image
                        src={'/contact.jpg'}
                        fill
                        sizes="100vw, (max-width: 1023px): 40vw"
                        alt="Car image"
                        className=" object-cover object-center"
                        quality={100}
                    />
                </div>
            </div>

            <Form className="flex flex-col items-center justify-center lg:w-3/5 xl:w-4/6" />
        </div>
    )
}
