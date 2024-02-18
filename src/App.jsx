import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import { useAuth } from './Store/authStore';
import Home from './Pages/Home';

const App = () => {
  const { auth} = useAuth()
  const router = createBrowserRouter([
    {
      path: "/",
      element:  auth.isAuth ? <Home/>: <Landing />,
    },
    {
      path: '/login',
      element:  auth.isAuth ?<Home/>: <Login />
    }
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App