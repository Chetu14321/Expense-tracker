import axios from "axios";
import React, { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppProvider";


const URL = "https://expense-tracker-api-gi5q.onrender.com";
function ExpenseItem(props) {


    const{token}=useContext(AppContext)
    const {_id, amount, title, editHandler} = props

    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure to delete transaction ${id}?`)) {
            await axios.delete(`${URL}/api/transaction/delete/${id}`,{
                headers: {
                    Authorization: token
                }
            })
            .then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
        }
    }

    return(
        <li className="list-item">
            <div className="list-left">
                <strong> {title} </strong>
                <span className="amount"> &#8377; {amount} </span>
            </div>
            <div className="list-right">
                <button onClick={() => editHandler(_id)} className="btn btn-info">
                    <i className="bi bi-pencil"></i>
                </button>
                <button onClick={() => deleteHandler(_id)} className="btn btn-danger">
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </li>
    )
}

export default ExpenseItem