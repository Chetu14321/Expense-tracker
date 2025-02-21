import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = "https://expense-tracker-api-gi5q.onrender.com"

// const URL = "https://expense-tracker-api-gi5q.onrender.com";


function Register(props) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password:""
    })

    // allow to navigate to the page
    const navigate = useNavigate()

    const readInput = (e) => {
        const {name, value} = e.target;
        setUser({...user , [name]: value} )
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            // console.log(`user = `, user)
            await axios.post(`${URL}/api/auth/register`, user)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/login`)
                    console.log(user)
                }).catch(err => toast.error(err.response.data.msg))
        } catch(err) {
            toast.error(err.message)
        }
    }

    return(
        <div className="container">
            <div className="title">
                <h3>Register</h3>
            </div>

            <div className="form-container">
                <form method='post' onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" name='name' value={user.name} onChange={readInput} id='name' className='form-input' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" name='email' value={user.email} onChange={readInput} id='email' className='form-input' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Your Mobile</label>
                        <input type="number" name='mobile' value={user.mobile} onChange={readInput} id='mobile' className='form-input' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Your Password</label>
                        <input type="password" name='password' value={user.password} onChange={readInput} id='password' className='form-input' required />
                    </div>
                    <div className='form-group'>
                        <input type="submit" value="Register" className='btn' />
                    </div>
                </form>
            </div>
        </div>    
    )
}

export default Register