'use client'
import { IoMdClose } from "react-icons/io"

interface ModalProps {
    title?: React.ReactNode | string,
    body?: React.ReactNode,
    footer?: React.ReactNode,
    onClose: () => void,
    isOpen: boolean,
    isTop?: boolean

}

const Modal: React.FC<ModalProps> = ({
    title,
    body,
    footer,
    onClose,
    isOpen,
    isTop=false
}) => {




    // FUNCTIONS HERE

    const handleClose = () => {
        onClose()
    }

    if (isOpen == false) {
        return
    }


    return (
        <div className={`
                fixed
                z-20 
                w-full 
                h-full 
                flex 
                items-center 
                justify-center 
                bg-gray-600/60
                `}
                >
            <div
                className={`
                w-full h-full flex flex-col items-center
                ${isTop ? "relative" : ""}
                `}

            >


                <div
                    className={`
                    bg-white 
                    rounded-lg
                    ${isTop ? "absolute" : "relative"}
                    ${isTop ? "top-[120px]" : null}
                    flex 
                    flex-col 
                    justify-center
                    w-[40vw]
                    lg:${isTop ? "w-[41vw]" : "w-[50vw]"}
                `}
                >
                    {/* Here will be the title */}
                    <div className="py-2 border-b flex items-center" >
                        <div className=" p-[2px] ml-4 " onClick={handleClose}>
                            <IoMdClose />
                        </div>
                        <div className=" w-full h-full flex items-center ">
                            {title}
                        </div>
                    </div>

                    {/* Here will be the body */}
                    <div className=" flex py-2 items-center justify-center flex-col">
                        {body}
                    </div>{footer?
                    <div className=" flex items-center py-1 bottom-0 border-t w-full">
                        {footer}
                    </div>:<></>}
                </div>
            </div>
        </div>
    )
}

export default Modal