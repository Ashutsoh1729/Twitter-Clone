import { create } from "zustand";

interface TweetModalProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useTweetModal = create<TweetModalProps>((set) => ({
    isOpen: false,
    onOpen: () => (set({ isOpen: true })),
    onClose: () => (set({ isOpen: false }))
}))

export default useTweetModal;







