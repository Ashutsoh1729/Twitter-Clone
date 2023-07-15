import getAllPosts from "@/action/get-all-posts";
import Header from "@/components/header";
import PostItem from "@/components/post/post-item";


export default async function Home() {

    const posts: any = await getAllPosts();




    return (
        <>
            <div className=" h-full w-full md:flex  md:flex-col md:col-span-6 border-r-2">
                <Header />
                <div className=" h-full w-full relative">
                    {
                        posts.map((item: any) => {
                            return (<>
                                <PostItem
                                    authorId={item.authorId}
                                    post={...item}
                                />
                            </>)
                        })
                    }
                </div>
            </div>
        </>
    )
}