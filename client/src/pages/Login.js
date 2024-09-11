import React from 'react'
import login from '../assets/products/login.gif'
import { FaFaceTired } from "react-icons/fa6";
import { FaFaceGrinTongueWink } from "react-icons/fa6";

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false)

  return (
        <section id='login'>
        <div className='mx-auto container p-2'>
            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                    <img className='rounded-full' src={login} alt='login.gif'></img>
                </div>

                <form className='pt-2'>
                    <div className='grid text-slate-700'>
                        <label>Email: </label>
                        <div className='bg-slate-100 rounded-md p-2'>
                            <input type='email' placeholder='enter email' className='w-full h-full outline-none bg-transparent'></input>
                        </div>
                        
                    </div>
                    <div>
                        <label>Password: </label>
                        <div className='bg-slate-100 rounded-md p-2 flex'>
                            <input type={showPassword ? "text": "password"} placeholder='enter password' className='w-full h-full outline-none bg-transparent'></input>
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prevValue)=>!prevValue)}>
                                <span>
                                    {
                                        showPassword? 
                                        (<FaFaceGrinTongueWink/>) : 
                                        ( <FaFaceTired/>)
                                    }
                                </span>
                            </div>
                        </div>    
                    </div>
                    <div className='align-middle pt-5'>
                    <button className='hover:scale-y-105 w-full h-10 bg-orange-500 py-1 rounded-full text-white hover:bg-orange-600 hover:text-orange-200 cursor-pointer'>Login</button>
                    </div>   
                </form>

            </div>
        </div>
    </section>
  )
}

export default Login