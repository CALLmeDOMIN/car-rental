'use client'

import { animated, useSpring } from '@react-spring/web'
import {
    IconCircleChevronLeft,
    IconCircleChevronRight,
    IconLuggage,
    IconUser,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function SlideshowElement({
    current,
    children,
    className,
}: {
    current: number
    children: React.ReactNode
    className?: string
}) {
    const getPercentage = () => ({
        x: -100 * current + '%',
    })
    const [springs, api] = useSpring(getPercentage)

    useEffect(() => {
        api.start({ to: getPercentage() })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current])

    return (
        <animated.div className={className} style={springs}>
            {children}
        </animated.div>
    )
}

export type Photo = {
    id: string
    imageUrl: string
    people?: number
    bags?: number
    name?: string
}

export default function Slideshow({ photos }: { photos: Photo[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cols = useCols()

    const clamp = (index: number) => {
        if (index < 0) return 0
        if (index >= photos.length - cols) return photos.length - cols
        return index
    }

    return (
        <div
            className={
                'relative overflow-hidden pt-10 font-sans [--cols:1] md:[--cols:2] lg:[--cols:3] xl:[--cols:4]'
            }
            style={
                {
                    '--total': photos.length,
                } as React.CSSProperties
            }
        >
            <div className="flex">
                {photos.map((photo) => (
                    <SlideshowElement
                        key={photo.id}
                        current={currentIndex}
                        className="h-full w-[calc(100%_/_var(--cols))] shrink-0 p-3"
                    >
                        <Link
                            passHref
                            href={`/car/${photo.id}`}
                            className={
                                'mx-2 flex transform flex-col gap-2 rounded-2xl shadow-md transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 ' +
                                (photo.id === photos[0].id
                                    ? ' bg-primary-button/70 dark:bg-primary-button/30 '
                                    : ' bg-secondary-button/50 dark:bg-secondary-button/10 ') +
                                (photo.name ? 'p-5' : ' p-0')
                            }
                        >
                            <div className="relative min-h-[150px]">
                                <Image
                                    src={photo.imageUrl}
                                    alt="image"
                                    fill
                                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 33vw, 25vw"
                                    className={
                                        'aspect-video rounded-md object-cover object-center shadow-md'
                                    }
                                />
                            </div>
                            {photo.name && (
                                <h1 className="text-xl font-semibold text-text dark:text-darktext">
                                    {photo.name}
                                </h1>
                            )}
                            {photo.people && (
                                <div className="flex justify-start gap-2">
                                    <div className="flex items-center gap-1 rounded-md bg-background p-1 px-1 pr-2 dark:bg-darkbg">
                                        <IconUser
                                            className="font-semibold text-text dark:text-darktext"
                                            size={20}
                                            aria-label="people"
                                        />
                                        <h1 className="font-semibold text-text dark:text-darktext">
                                            {photo.people}
                                        </h1>
                                    </div>
                                    <div className="flex items-center gap-1 rounded-md bg-background p-1 px-1 pr-2 dark:bg-darkbg">
                                        <IconLuggage
                                            className="font-semibold text-text dark:text-darktext"
                                            size={20}
                                            aria-label="bags"
                                        />
                                        <h1 className="font-semibold text-text dark:text-darktext">
                                            {photo.bags}
                                        </h1>
                                    </div>
                                </div>
                            )}
                        </Link>
                    </SlideshowElement>
                ))}
            </div>

            <button
                className={
                    'absolute right-16 top-0 z-10 ' +
                    (currentIndex
                        ? 'cursor-pointer text-primary-button'
                        : 'cursor-default text-gray-500')
                }
                onClick={() => setCurrentIndex(clamp(currentIndex - 1))}
            >
                <IconCircleChevronLeft size={48} aria-label="slide left" />
            </button>

            <button
                className={
                    'absolute right-4 top-0 z-10 ' +
                    (currentIndex != photos.length - cols
                        ? 'cursor-pointer text-primary-button'
                        : 'cursor-default text-gray-500')
                }
                onClick={() => setCurrentIndex(clamp(currentIndex + 1))}
            >
                <IconCircleChevronRight size={48} aria-label="slide right" />
            </button>
        </div>
    )
}

const useCols = () => {
    const [cols, setCols] = useState(1)

    const updateCols = () => {
        if (window.innerWidth < 768) setCols(1)
        else if (window.innerWidth < 1024) setCols(2)
        else if (window.innerWidth < 1280) setCols(3)
        else setCols(4)
    }

    useEffect(() => {
        updateCols()
        window?.addEventListener('resize', updateCols)
        return () => window?.removeEventListener('resize', updateCols)
    }, [])

    return cols
}
