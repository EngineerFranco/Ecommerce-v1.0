import React from 'react'
import Logo from './Logo'
import { IoSearchSharp } from "react-icons/io5";
import { RiUser3Line } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-20 pt-2'>
      
      {/* Header: Logo, Searchbar, Cart and User */}
      <div className = 'h-full container mx-auto flex items-center item justify-between bg-white rounded-full shadow-lg'>
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

            <div className='text-3xl cursor-pointer'>
               <RiUser3Line />
            </div>
            <div className='text-3xl cursor-pointer relative'>
              <span><FaCartShopping /></span>
              <div className='bg-orange-500 text-white w-5 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-2'>
                <p className='text-sm'>0</p>
              </div>
            </div>

            <div>
            <Link to={"/login"} className='px-3 bg-orange-500 py-1 rounded-full text-white hover:bg-orange-600 hover:text-orange-200 cursor-pointer'>Login</Link>
            </div>
            
           

        </div>
      </div>
      
    </header>
  )
}

export default Header