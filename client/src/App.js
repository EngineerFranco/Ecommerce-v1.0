import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Bounce, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import summaryAPI from './common';
import Context from './context';
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(summaryAPI.current_user.url, {
        method: summaryAPI.current_user.method,
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!dataResponse.ok) {
        throw new Error(`Error: ${dataResponse.status} ${dataResponse.statusText}`);
      }

      const dataAPI = await dataResponse.json();
      console.log("Data user: ", dataAPI);

      if(dataAPI.success){
        dispatch(setUserDetails(dataAPI.data))
      }

    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }

  useEffect(() => {
    // user details
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value = {{
        fetchUserDetails
      }}>
        <ToastContainer 
        position="top-center"
        autoClose={400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}/>
        <Header />
          <main className='min-h-[calc(100vh-137px)]  p-3 text-slate-800'>
            <Outlet />
          </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
