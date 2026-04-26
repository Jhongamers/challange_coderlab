import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.tsx'
import { Toaster } from 'sonner';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateProductPage } from './pages/CreateProductsPage/index.tsx';
import { ProductDetailsPage } from './pages/ProductDetailsPage/index.tsx';
import { Navbar } from './components/Header/index.tsx';
import { DefaultLayout } from './components/Layout/index.tsx';
import { EditProductPage } from './pages/EditProductsPage/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children:[

      {
        path: '/',
        element: <App />
      },
      {
        path: '/product/create',
        element: <CreateProductPage />
      },
      {
        path: '/product/:id',
        element: <ProductDetailsPage />
      },
      {
        path: '/product/edit/:id',
        element: <EditProductPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
