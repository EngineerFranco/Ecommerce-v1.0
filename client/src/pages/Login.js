import React, { useContext } from 'react'
import login from '../assets/products/login.gif'
import { FaFaceTired } from "react-icons/fa6";
import { FaFaceGrinTongueWink } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import summaryAPI from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const {name , value} = e.target
        
        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const navigate = useNavigate()
    const {fetchUserDetails} = useContext(Context)
    console.log(fetchUserDetails)

    const handeSubmit = async(e) => {
        e.preventDefault()
        
        console.log("BODY: ", data)
        const dataResponse = await fetch(summaryAPI.login.url,{
            method : summaryAPI.login.method,
            credentials: "include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataResult = await dataResponse.json()
        
        if(dataResult.success){
            toast.success(dataResult.message)
            navigate("/")
            fetchUserDetails()
        }
        if(dataResult.error){
            toast.error(dataResult.message)
        }
}

  return (
    <section id='login'>
        <div className='mx-auto container p-6 '>
            <div className='bg-white p-5 py-5 w-full max-w-md mx-auto rounded-md hover:shadow-lg'>
                
                <div className='w-20 h-20 mx-auto'>
                    <img className='rounded-full hover:scale-105 transition-transform duration-500 hover:shadow-md' src={login} alt='login.gif' />
                </div>

                <form className='pt-5'onSubmit={handeSubmit}>
                    <div className='grid text-slate-700'>
                        <label>Email: </label>
                        <div className='bg-slate-100 rounded-md p-2 flex focus-within:ring-2 focus-within:ring-orange-200 focus-within:outline-none'>
                            <input 
                                type='email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                placeholder='enter email' 
                                className='w-full h-full outline-none bg-transparent focus:placeholder-transparent required'
                                required
                            />
                        </div>
                    </div>
                    <div className='pt-4'>
                        <label>Password: </label>
                        <div className='bg-slate-100 rounded-md p-2 flex focus-within:ring-2 focus-within:ring-orange-200 focus-within:outline-none'>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                placeholder='enter password' 
                                className='w-full h-full outline-none bg-transparent focus:placeholder-transparent required'
                                required
                            />
                            <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prevValue) => !prevValue)}>
                                <span>
                                    {showPassword ? (<FaFaceGrinTongueWink />) : (<FaFaceTired />)}
                                </span>
                            </div>
                        </div>    
                    </div>
                    <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-700'>
                    Forgot Password ?
                    </Link>
                    <div className='align-middle pt-5'>
                        <button className='hover:scale-y-105 w-5/12 h-10 bg-orange-500 py-1 rounded-full text-white hover:bg-orange-600 hover:text-orange-200 cursor-pointer mx-auto mt-4 block'>
                            Login
                        </button>
                    </div>   
                </form>
                <p className='mt-5 mb-2'>Don't have account ? <Link to={"/register"} className='text-orange-400 hover:text-orange-600 hover:underline'>Register</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login