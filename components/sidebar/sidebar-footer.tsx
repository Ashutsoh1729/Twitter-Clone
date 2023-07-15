'use client'

import { IconType } from "react-icons"
import Avatar from "../ui/avatar"
import { signOut } from "next-auth/react"



interface SidebarFooterProps{
    name: string,
    img: string,

}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ name = "", img }) => {
    
    const handleClick = () => {
        signOut();
    }

    return (
        <div className=' absolute bottom-0 pl-12 w-full py-4 border-t'>
            <div className=' w-full h-full flex items-center'>
                <div className='profile w-12 h-12 rounded-full hover:bg-slate-400' onClick={handleClick}>
                    <Avatar name={name} img={img} size={40} />
                </div>
                <div className='name ml-4 text-xl font-medium'>
                    {name}
                </div>
            </div>
        </div>
    )
}

export default SidebarFooter