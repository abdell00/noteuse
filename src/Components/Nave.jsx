import React from 'react'
import { useAuth } from '../Store/authStore'
import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { pixelArtNeutral } from '@dicebear/collection';

const Nave = () => {
  const { auth, logout } = useAuth()
  const avatar = useMemo(() => {
    return createAvatar(pixelArtNeutral, {
      size: 128,
      seed: auth?.user?.username
      
    }).toDataUriSync();
  }, []);
  return (
    <div className="navbar bg-base-100">
      <div className='w-10 h-16 cursor-pointer hover:animate-ping '>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path d="M8 6C8 4.89543 8.89543 4 10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round"></path> <path d="M16 20H32" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 28H32" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
 
      </div>
       <div className="flex-1">
    <a className="btn btn-ghost text-xl">Notes App</a>
  </div>
  <div className="flex-none">
    {
    auth.isAuth ?
    <div className='flex flex-row items-center gap-3' >
    <p>Hello  {auth?.user?.username} </p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <img src={avatar} className='h-12 w-12' alt="" />
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={logout} >Logout</a></li>
      </ul>
    </div>
    </div>
    :
    <button>Login</button>
    }
  </div>
</div>
  )
}

export default Nave