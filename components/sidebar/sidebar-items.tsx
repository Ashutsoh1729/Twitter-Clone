'use client'

import { IconType } from "react-icons"


interface SidebarItemsProps {
    name: string,
    icon: IconType,
    label: string,
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ name, icon: Icon, label }) => {


    return (
        <>
            <div className="  w-full flex items-center my-2 ">
                <div className=" flex items-center justify-center  py-3 px-4 rounded-full cursor-pointer hover:bg-slate-300">
                    <Icon size={30} />
                    <div className= {`ml-4 text-xl font-san ${label=="home" ?"font-semibold" : null}`}>
                        {name}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarItems