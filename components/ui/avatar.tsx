import Image from "next/image"
import { MdPerson } from "react-icons/md"

interface AvatarProps{
    size?: number,
    img?: string,
    name?: string,
    width?: number,
    height?: number
}

const Avatar: React.FC<AvatarProps> = (
    {
        size,
        img="",
        name="",
        width,
        height
    }
) => {
    return (
        <div>
            <div className={`flex justify-center items-center`}>
                {/* <Image alt={name} src={img}/> */}
                <div className=" p-3 flex items-center justify-center rounded-full hover:bg-gray-500">
                    <MdPerson size={28}/>
                </div>
            </div>
        </div>
    )
}

export default Avatar