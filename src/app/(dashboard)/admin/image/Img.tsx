'use client'

import { useRef } from 'react'
import addImage from './addImage'

export default function Img({ id }: { id: number }) {
    const pictureRef = useRef<HTMLInputElement>(null!)

    return (
        <div className="flex">
            <button
                type="button"
                name="picture"
                value={id}
                className="border border-blue-600 font-semibold text-blue-600"
                onClick={() =>
                    addImage({ id: id, url: pictureRef.current.value })
                }
            >
                +
            </button>
            <input
                type="text"
                className="border"
                ref={pictureRef}
                placeholder="url"
            />
        </div>
    )
}
