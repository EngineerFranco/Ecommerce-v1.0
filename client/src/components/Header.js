import React, { useState } from 'react'
import Logo from './Logo'
import { IoSearchSharp } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryAPI from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice.js';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  console.log("User Header: ", user)

  const [menuDisplay, setMenuDisplay] = useState(false)

  const handleLogout = async () =>{
    const fetchData = await fetch(summaryAPI.logout.url,{
      method: summaryAPI.logout.method,
      credentials : "include"
    })

  const dataAPI = await fetchData.json()
  if(dataAPI.success){
    dispatch(setUserDetails(null))
    toast.success(dataAPI.message)
  }
  if(dataAPI.error){
    toast.error(dataAPI.message)
  }

  }
  return (
    <header className='h-20 bg-white shadow-2xl rounded-full'>
      
      {/* Header: Logo, Searchbar, Cart and User */}
      <div className='h-full w-full flex items-center justify-between px-4 mx-auto'>
        <div className=''>
          <Link to={"/"}>
          <Logo w={100} h={50}/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-screen-sm border border-transparent bg-gradient-to-r from-orange-500 to-orange-600 rounded-full focus-within:shadow-2xl transition-shadow duration-300'>
          <input 
            type='text' 
            placeholder='Search product here...' 
            className='flex-grow h-10 bg-transparent text-white placeholder-orange-700 outline-none pl-4 pr-2 focus:placeholder-white transition-colors duration-300'
          />
          <div className='text-lg w-12 h-10 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center rounded-full text-white cursor-pointer hover:scale-110 transform transition-transform duration-300'>
            <IoSearchSharp />
          </div>
        </div>

        <div className='flex items-center justify-between gap-8 pr-4'>

            <div className='relative flex justify-center'>
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=> setMenuDisplay(prevValue => !prevValue)}>
                  {
                    user?.profilePic? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                    ) : <RiUser3Line />
                  }
              </div>

                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-12 h-fit p-2 shadow-xl rounded-3xl'>
                        <nav>
                          <Link to={"admin-panel"} className=' text-slate-800 whitespace-nowrap hover:text-orange-600 hover:font-semibold rounded-2xl p-2 ' onClick={()=> setMenuDisplay(prevValue => !prevValue)}>Admin Panel</Link>
                        </nav>
                    </div>
                    )
                  }
            </div>

            <div className='text-3xl cursor-pointer relative'>
              <span><FaCartShopping /></span>
              <div className='bg-orange-500 text-white w-5 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-2'>
                <p className='text-xs'>0</p>
              </div>
            </div>

            <div>
              {
                user?._id?(
                  <button onClick={handleLogout} className='px-3 bg-orange-500 py-1 rounded-full text-white hover:bg-orange-600 hover:text-orange-200 cursor-pointer'>Logout</button>
                ): (
                  <Link to={"/login"} className='px-3 bg-orange-500 py-1 rounded-full text-white hover:bg-orange-600 hover:text-orange-200 cursor-pointer'>Login</Link>
                )
                
              }
           
            </div>
        </div>
      </div>
      
    </header>
  )
}

export default Header