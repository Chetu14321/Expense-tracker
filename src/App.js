import React, { useContext } from 'react';
import ExpenseTracker from './Pages/ExpenseTracker';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import ProtectedRoute from './AuthGuard/ProtectedRoute';

import Menu from './Component/Menu';
import { AppContext } from './Context/AppProvider';
import Register from './Pages/Register';
import Login from './Pages/Login';



function App() {

  const {token,isLogin}=useContext(AppContext)
  return(
    <BrowserRouter>
      <Menu/>
      <ToastContainer autoClose={4000} position={"top-right"} />
      <div className='main-container'>
        <Routes>
          <Route element={<ProtectedRoute/>}>
              <Route path={'/'} element={<ExpenseTracker/>} />  
          </Route>
          <Route path={'/Register'} element={token && isLogin ? <Navigate to={`/`}/> : <Register/> }/>
          <Route path={'/Login'}  element={token && isLogin ? <Navigate to={`/`}/> : <Login/> }/>
          <Route path={'/*'} element={<NotFound/>} />
        </Routes>
    </div>
    {/* <ExpenseTracker/> */}
    </BrowserRouter>
  )
}

export default App