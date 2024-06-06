"use client"
import React, { useState } from 'react'
import Form from '@/components/Form'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const page = () => {
    const router=useRouter();
    const {data:session}=useSession();
    const[post,setPost]=useState({
        prompt:'',
        tag:''
    });
    const[submitting,setSubmitting]=useState(false);
    const createPrompt=async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        try{
            const response=await fetch('/api/prompt/new',{
                method:'POST',
                body:JSON.stringify({
                    tag:post.tag,
                    prompt:post.prompt,
                    userId:session?.user.id
                })
            });
            if(response.ok){
                router.push('/')
            }

        }catch(err){
            console.log(err);
        }
        finally{
            setSubmitting(false);
        }
    } 
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  )
}

export default page
