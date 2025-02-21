import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const URL = "https://expense-tracker-api-gi5q.onrender.com";



function Menu(props) {

    const {isLogin,token, setToken,setIsLogin}=useContext(AppContext)

    const logouthandler= async ()=>{
        if(window.confirm('are you sure to logout')){
            await axios.get(`${URL}/api/auth/logout`)
            .then(res=>{
                toast.success(res.data.msg)
                setToken(false)
                setIsLogin(false)
                sessionStorage.removeItem('token')
                // window.location.reload()
            }).catch(err=> toast.error(err.response.data.msg))
        }
    }
    return(
        <div className='navbar'>
            <NavLink to={'/'} className="logo">Expense Tracker</NavLink>
            <div className="container">

                {
                    token && isLogin?(
                        <>
                        <ul className="menu">
                        <li className="item">
                            <NavLink to={'/'} className="nav-link">Home</NavLink>
                        </li>
                    </ul>
                    <ul className="menu">
                        <li className="item">
                            <NavLink onClick={logouthandler} className="nav-link logout">Logout</NavLink>
                        </li>
                    </ul>
                    </>

                    ):(
              
               
                <ul className="menu">
                    <li className="item">
                        <NavLink to={'/login'} className="nav-link">Login</NavLink>
                    </li>
                    <li className="item">
                         <NavLink to={'/register'} className="nav-link">Register</NavLink>
                    </li>
                </ul>
            
            )}
            </div>
        </div>
    )
}

export default Menu