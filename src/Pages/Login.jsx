import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  {AppContext} from '../Context/AppProvider'



const URL = "https://expense-tracker-api-gi5q.onrender.com"; // Backend URL

function Login() {

    const {setIsLogin,setToken}=useContext(AppContext)
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const readInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
           console.log('user',user)
        
            await axios.post(`${URL}/api/auth/login`,user)
            .then(res=>{
                console.log('user',res.data)
                toast.success(res.data.msg)
                setToken(res.data.loginToken)
                setIsLogin(true)
                
                sessionStorage.setItem("token", res.data.loginToken);
                console.log(res.loginToken)
                navigate('/')
            }).catch (err=> toast.error(err.response.data.msg));
        }catch (err){toast.error(err.message)

        }
    };

    return (
        <div className="container">
            <div className="title">
                <h3>Login</h3>
            </div>

            <div className="form-container">
                <form method="post" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={readInput}
                            id="email"
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Your Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={readInput}
                            id="password"
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
