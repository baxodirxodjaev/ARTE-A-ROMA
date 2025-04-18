import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Policy from './pages/Policy'
import Policies from './components/Policies'
import ProtectedRoute from './components/ProtectedRoute'
import AdminPanel from './pages/AdminPanel'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify'
import ProductDetail from './components/ProductDetail'
import { JSX } from 'react'


const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/" />;
  return children;
};

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
              <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route index element={ <HomePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin" element={<ProtectedRoute>
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              </ProtectedRoute>} />
              <Route path="/product" element={<Products  />} />
              <Route path="/product/:type/:id" element={<ProductDetail/>} />
              <Route path='/policies' element={<Policy />} >
                <Route path="refund-policy" element={<Policies value ='Refund policy' />} />
                <Route path="privacy-policy" element={<Policies value ='Privicy and Policy' />}/>
                <Route path="terms-and-conditions" element={<Policies value ='Terms and conditions' /> } />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>      
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
