import React, { useContext, useEffect, useState } from 'react';
import Display from "../Component/Display"
import ExpenseForm from "../Component/Expense"
import Transactions from '../Component/Transactions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../Context/AppProvider';

const URL = "https://expense-tracker-api-gi5q.onrender.com";

export default function ExpenseTracker(props) {
    const {token}=useContext(AppContext)
    const [expenses, setExpenses] = useState([])

    const [balance, setBalance] = useState(0)
    const [income, setIncome] = useState(0)
    const [exp, setExp] = useState(0)

    const [isEdit, setIsEdit] = useState(false) // true = edit, false = add
    const [editId, setEditId] = useState(false) // store the edit item id

    const editHandler = async (id) => {
        setIsEdit(true)
        console.log(`id = `, id)
        setEditId(id)
    }

    //read the data
    const readData = async () => {
        await axios.get(`${URL}/api/transaction/all`,{
            headers: {
                Authorization:token
            }
 
        })
            .then(res => {
                console.log(`res =` , res)
                setExpenses(res.data.transactions)
                printData(res.data.transactions)
            }).catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        readData()
    },[])

    const printData = (Transactions) => {
        //balance
        let amounts = Transactions?.map(item => Number(item.amount))
        console.log(`amount = `, amounts)

        //income
        let income = amounts.filter(item => item > 0).reduce((ac, cu) => ac + cu, 0).toFixed(2)
        setIncome(income)

        // expense
        let ex = amounts.filter(item => item < 0).reduce((ac, cu) => ac + cu, 0).toFixed(2)
        setExp(ex)

        // blance 
        let bal = income - Math.abs(ex)
        setBalance(bal.toFixed(2))
    }

    return (
        <div className='container'>
            <div className='title'>
               <h1 className="expense-title"> Expense Tracker</h1>
               <div className="underline"></div>
            </div>
            <Display bal={balance} incm={income} expn={exp} />
            <ExpenseForm isEdit={isEdit} editId={editId} />
            <Transactions trans={expenses} editHandler={editHandler} />
        </div>
    )
}