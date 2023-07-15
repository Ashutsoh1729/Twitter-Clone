'use client'
import { sidebarItems } from "@/lib/data/data"
import { BsTwitter } from "react-icons/bs"
import SidebarItems from "./sidebar-items";
import SidebarFooter from "./sidebar-footer";
import useAuthModal from "@/hook/use-auth-modal";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useTweetModal from "@/hook/use-tweet-modal";

const Sidebar = () => {

    // ALL THE CONSTANTS WILL BE HERE
    const items = sidebarItems;
    const auth = useAuthModal();
    const session = useSession();
    const tweet = useTweetModal();

    // ALL THE FUNCTIONS WILL BE HERE
    const handleSubmit = () => {
        if (session.status != "authenticated") {
            auth.onOpen()
            console.log(session);
        } else {
            // here we will open the tweet modal
            tweet.onOpen();
        }
        console.log(session.data?.user?.name);


    }




    return (
        <>
            <div className=" h-full w-full hidden  md:flex lg:col-span-3 border-r-2">
                <div className=" h-full w-full flex flex-col relative">

                    {/* For the logo */}
                    <div className="  ml-12 my-3 text-blue-400 flex items-center " id="twitter-btn">
                        <div className=" items-center cursor-pointer rounded-full hover:bg-gray-200 flex p-4 w-auto"
                        >
                            <BsTwitter size={34} />
                        </div>
                    </div>

                    {/* For the items */}
                    <div className=" md:pl-12">
                        {
                            items.map((item) => (
                                <>
                                    <SidebarItems
                                        name={item.name}
                                        label={item.label}
                                        icon={item.icon}
                                    />
                                </>
                            ))
                        }
                    </div>
                    <div id="button"
                        className=" 
                            w-full 
                            flex 
                            justify-center 
                            items-center
                    "
                    >
                        <div
                            className="
                                p-3 
                                bg-sky-500 
                                text-white 
                                font-medium 
                                font-sans 
                                rounded-full 
                                text-lg 
                                lg:px-20 
                                cursor-pointer
                                mt-6
                        "
                            onClick={handleSubmit}
                        >
                            <button className="">
                                Tweet
                            </button>
                        </div>
                    </div>
                    {/* Footer */}
                    <SidebarFooter
                        name={session.data?.user?.name!}
                        img={session.data?.user?.image!}
                    />

                </div>
            </div>
        </>
    )
}

export default Sidebar















