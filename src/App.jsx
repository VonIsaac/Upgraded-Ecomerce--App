import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Products from './components/Products';
import './App.css'

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
      element: <Products />
    }


  ])


  return (
      <RouterProvider router={router} />
  )
}

export default App
