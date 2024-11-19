import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import {queryClient} from './utils/https'
import FrontPage from './components/FrontPage';
import Products from './components/Products';
import './App.css'
//import Modal from './components/UI/Modal';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to={'/front-page'} /> 
    },

    {
      path: '/front-page',
      element: <FrontPage />,
      
    },
    {
      path: '/products',
      element: <Products />,
      
    }


  ])


  return (
     <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
     </QueryClientProvider>
  )
}

export default App
