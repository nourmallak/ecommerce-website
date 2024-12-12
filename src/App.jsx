import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import UserContextProvider from './context/Context';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserContextProvider>
    </>

  )

}


export default App
