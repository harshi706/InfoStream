"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {
const isUserLoggedIn=true;
const [providers,setProviders]=useState(null);
const [toggleDropDown,setToggleDropDown]=useState(false);
const {data:session}=useSession();

useEffect(()=>{
  const funcProvider=async()=>{
    const response=await getProviders();
    setProviders(response);
  }
  funcProvider();
},[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
    <Link href='/' className='flex gap-2 flex-center'>
      <Image 
      src='/assets/icons/logoIcon.jpg'
      alt='Logo'
      height={44}
      width={44}
      className='object-contain'
      />
      <p className='logo_text'>InfoStream</p>
    </Link>

{/* desktop nav  */}
    <div className='sm:flex hidden'>
    {session?.user?(
      <div className='flex gap-3 md:gap-5'>
      <Link href='/create-prompt' className='black_btn'>
      Create Post
      </Link>
      <button type='button' onClick={signOut} className='outline_btn'>
        Sign Out
      </button>
      <Link href='/profile'>
        <Image src={session?.user.image}
        height={36}
        width={36}
        className='rounded-full'
        alt='Profile'/>
      </Link>
      </div>
    ):(
      <>
      {providers && Object.values(providers).map((provider)=>(
        <button type='button' key={provider.name}
        onClick={()=>signIn(provider.id)}
        className='black_btn'>
        Sign In
        </button>
      ))}
      </>
    )}
    </div>

    {/* phone nav */}
    <div className='sm:hidden flex relative'>
    {session?.user?(
      <div className='flex'>
      <Image src={session?.user.image}
        height={36}
        width={36}
        className='rounded-full'
        alt='Profile'
       onClick={()=>setToggleDropDown((prev)=>!prev)}
        />
        {toggleDropDown &&(
          <div className='dropdown'>  
          <Link href='/profile'
      className='dropdown_link'
      onClick={()=>setToggleDropDown(false)}>
      My Profile
      </Link>
      <Link href='/create-prompt' className='dropdown_link'
      onClick={()=>setToggleDropDown(false)}>
      Create Tweet
      </Link>
      <button 
      type='button' 
      onClick={()=>{setToggleDropDown(false);signOut();}}
      className='mt-5 w-full black_btn'>
        Sign Out
      </button>
          </div>
        )}
      </div>
    ):(
      <>
      {providers && Object.values(providers).map((provider)=>(
        <button type='button' key={provider.name}
        onClick={()=>signIn(provider.id)}
        className='black_btn'>
        Sign In
        </button>
      ))}
      </>
    )}
    </div>
    </nav>
  )
}

export default Nav
