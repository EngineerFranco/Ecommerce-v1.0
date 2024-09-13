import React from 'react'
import { FaFaceGrinTongueWink, FaFaceTired } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/products/login.gif';
import imageToBase64 from '../helpers/imageToBase64';
import summaryAPI from '../common';
import { toast } from 'react-toastify';

const Register = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic : ""
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

    console.log("Data: ", data)
    const navigate = useNavigate()

    const handeSubmit = async(e) => {
        e.preventDefault()

        if(data.password === data.confirmPassword){
          const dataResponse = await fetch(summaryAPI.register.url,{
            method : summaryAPI.register.method,
            headers :{
              "content-type" : "application/json"
            },
            body: JSON.stringify(data)
          })
  
          const dataResult = await dataResponse.json()
          if(dataResult.success){
            toast.success(dataResult.message)
            navigate("/login")
          } else{
            toast.error(dataResult.message)
          }
  
        } else{
          console.log(`Please check password and confirm password`)
          toast(`Please check password and confirm password`)
        }
    
    }

    const handleUploadPic = async (e) => {
      const file = e.target.files[0]

      const imagePic = await imageToBase64(file)
      setData((prevValue) => {
        return{
          ...prevValue,
          profilePic : imagePic
        }
      })

     
    }


  return (
    <section id='register'>
        <div className='mx-auto container p-6 '>
            <div className='bg-white p-5 py-5 w-full max-w-md mx-auto rounded-md hover:shadow-lg'>

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full  hover:shadow-md hover:scale-105 transition-transform duration-500'>
                  <div>
                    <img className='rounded-full' src={data.profilePic || login} alt='login.gif' />
                  </div>
                <form>
                  <label>
                    <div className='bg-opacity-70 bg-orange-400 p-1 text-xs text-center rounded-md b mx-auto absolute bottom-0 w-full cursor-pointer hover:bg-orange-500 '>
                      <p className='text-orange-200 font-bold hover:text-orange-100'>Upload</p>
                    </div>
                    <input type='file' className='hidden' onChange={handleUploadPic}></input>
                  </label>
                </form>
                </div>

                <form className='pt-5 flex flex-col gap-2'onSubmit={handeSubmit}>
                  <div className='grid text-slate-700'>
                      <label>Name: </label>
                      <div className='bg-slate-100 rounded-md p-2 flex focus-within:ring-2 focus-within:ring-orange-200 focus-within:outline-none'>
                          <input 
                              type='text' 
                              name='name'
                              value={data.name}
                              onChange={handleOnChange}
                              placeholder='enter name' 
                              className='w-full h-full outline-none bg-transparent focus:placeholder-transparent required'
                              required
                          />
                      </div>
                  </div>

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
      
                  <div className='grid text-slate-700'>
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

                  <div className='grid text-slate-700'>
                    <label>Confirm Password: </label>
                    <div className='bg-slate-100 rounded-md p-2 flex focus-within:ring-2 focus-within:ring-orange-200 focus-within:outline-none'>
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            placeholder='confirm password' 
                            className='w-full h-full outline-none bg-transparent focus:placeholder-transparent required'
                            required
                        />
                          <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prevValue) => !prevValue)}>
                              <span>
                                  {showConfirmPassword ? (<FaFaceGrinTongueWink />) : (<FaFaceTired />)}
                              </span>
                          </div>
                        </div>   
                  </div>
                  

                    <div className='align-middle pt-5'>
                        <button className='hover:scale-y-105 w-5/12 h-10 bg-orange-500 py-1 rounded-full text-white hover:bg-orange-600 hover:text-orange-200 cursor-pointer mx-auto mt-4 block'>
                            Register
                        </button>
                  </div> 

                </form>
                <p className='mt-5 mb-2'>Already have account ? <Link to={"/login"} className='text-orange-400 hover:text-orange-600 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Register