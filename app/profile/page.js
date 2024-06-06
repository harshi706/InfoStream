"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

export default function Page() {
    const router = useRouter();
    const { data: session } = useSession();

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setMyPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit=async(post)=>{
      router.push(`/update-prompt?id=${post._id}`)
        
    }
    const handleDelete=async(post)=>{
            try{
                const res=await fetch(`/api/prompt/${post._id}`,{
                    method:'DELETE'
                });
                if(!res.ok){
                    throw new Error('Failed to delete the post');
                }
                setMyPosts(myPosts.filter((p) => p._id !== post._id));
                alert("Post deleted successfully. Wait for few seconds.");
            }catch(error){
                console.log(error);
            }
        }

    return (
        <>
            <Profile
                name='My'
                desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
                data={myPosts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    )
}