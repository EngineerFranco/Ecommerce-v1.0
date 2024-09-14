import React, { useState } from 'react'
import { RiUser3Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const Admin = () => {
    const user = useSelector(state => state?.user?.user)
  return (
    <div className='min-h-[calc(100vh-137px)] bg-white rounded-3xl flex shadow-2xl'>
        <aside className='min-h-full w-full max-w-60 shadow-2xl bg-orange-50 rounded-3xl pt-1' >
            <div className='h-32 flex justify-center items-center bg-orange-400 flex-col rounded-full pt-1' >
                <div className=' cursor-pointer relative flex justify-center '>
                    {
                        user?.profilePic? (
                        <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name}/>
                        ) : <RiUser3Line />
                    }
                </div>
                <p className='capitalize font-semibold text-pretty'>{user.name}</p>
                <p>{user?.role}</p>
            </div>
        </aside>

        <main>
            main
        </main>
    </div>
  )
}

export default Admin