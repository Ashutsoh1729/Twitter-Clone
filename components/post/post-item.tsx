'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Avatar from '../avatar'
import axios from 'axios'
// import Image from 'next/image'
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { useRouter } from 'next/navigation'

interface PostItemProps {
    post: any,
    authorId: string,
}



const PostItem: React.FC<PostItemProps> = ({
    post,
    authorId
}) => {


    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
        
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/user/${authorId}`);
                setUser(response.data); // Update user state with the fetched data
                setLoading(false); // Set loading to false when data is fetched successfully
            } catch (error) {
                setError('Error fetching user data'); // Set error state in case of an error
                setLoading(false); // Set loading to false on error as well
            }
        };

        fetchUserData();
    }, [authorId]);

    
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    
    const handleDelete = useCallback(() => {
        axios.delete(`/api/post/${post.id}`)
            .then((res) => {
                console.log(res.data);
                router.refresh();
            })
            .catch((error) => {
            console.log(error);
            
        })
        
    },[post.id])
    

    return (
        <div className=' w-full flex items-center  border-b py-4 relative'>
            <div className='avatar mb-auto px-2'>
                <Avatar img={user?.image} />
            </div>
            <div id='display' className=' w-full h-full pl-3 flex flex-col '>
                <div className='top-4 font-semibold w-full flex justify-between items-center'>
                    <h1 className='mb-2'>{user?.name}</h1>
                    <div className=' pr-4 cursor-pointer' onClick={handleDelete}>
                        <BiDotsHorizontalRounded size={20} className=' '/>
                    </div>
                </div>
        {/* You can access other properties of the user as needed */}
                {/* For example: <p>Email: {user?.email}</p> */}
                <div className='content w-full h-full '>
                    {post.content}
                </div>
            </div>
        </div>
    )
}

export default PostItem