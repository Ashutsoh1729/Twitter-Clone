import { MdHome } from "react-icons/md"
import { BsSearch } from 'react-icons/bs'
import { IoNotificationsOutline } from "react-icons/io5"

const sidebarItems = [
    {
        name: "Home",
        label: "home",
        icon: MdHome
    },
    {
        name: "Search",
        label: "search",
        icon: BsSearch
    },
    {
        name: "Notifications",
        label: "notifications",
        icon: IoNotificationsOutline
    },
]


export {sidebarItems}