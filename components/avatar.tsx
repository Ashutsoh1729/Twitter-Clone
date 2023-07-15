"use client"
import axios from "axios"
import Image from "next/image"
import { useEffect } from "react"


interface AvatarProps {
    img: string,
    isLarge?: boolean,
    hasBorder?: boolean
}


const Avatar: React.FC<AvatarProps> = ({
    img,
    isLarge,
    hasBorder
}) => {


  

    return (
        <div
            className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
        `}
        >
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="Avatar"
                
                src={img || '/images/placeholder.png'}
            />
        </div>
    )
}

export default Avatar