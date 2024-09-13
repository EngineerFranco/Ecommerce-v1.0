import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import summaryAPI from './common';

function App() {

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
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-137px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
