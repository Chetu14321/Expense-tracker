import React, { useEffect, useState ,useContext} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../Context/AppProvider';

const URL = "https://expense-tracker-api-gi5q.onrender.com";

function ExpenseForm(props) {
    const {token}=useContext(AppContext)
    const {isEdit, editId} = props

    const [expense, setExpense] = useState({
        title: "",
        amount: 0
    })

    // call the api to read single item
    const readData = async () => {
        await axios.get(`${URL}/api/transaction/single/${editId}`,{
            headers: {
                Authorization:token
            }
        })
        .then(res => {
            setExpense(res.data.transaction)
        }).catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        if(isEdit) {
            readData()
        }
    },[isEdit, editId])

    const readInput = (e) => {
        const {name, value} = e.target 
        setExpense({...expense, [name]:value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // update request - patch
            console.log(`data = `, expense)
            if(isEdit) {
            await axios.patch(`${URL}/api/transaction/update/${editId}`, expense,{
                headers: {
                    Authorization:token
                }
            })
            .then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }) 
            .catch(err => toast.error(err.response.data.msg))
            } else {
                // add request - post
            await axios.post(`${URL}/api/transaction/add`, expense,{
                headers: {
                    Authorization:token
                }
            })
            .then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }) 
            .catch(err => toast.error(err.response.data.msg))
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return(
        <div className='dashboard'>
            <form onSubmit={submitHandler}>
                <div className="card">
                    <div className="form-group">
                        <input type="text" name='title' value={expense.title} onChange={readInput} id='title' className='form-item' placeholder='Enter title' required />
                    </div>
                    <div className="form-group">
                        <input type="number" name="amount" id="amount" value={expense.amount} onChange={readInput} className='form-item' placeholder='Enter amount' required />
                    </div>
                    <div className="form-group">
                        <button className="btn submit">
                            Add Transaction
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ExpenseForm

