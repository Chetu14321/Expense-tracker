import React from 'react';
import ExpenseItem from "./ExpenseItem"

function Transactions(props) {
    const {trans, editHandler} = props
    return (
        <div className='transactions'>
            <p className="title">Transactions</p>

            <ul className="list">
                {
                    trans?.map((item,index) => {
                        return(
                            <ExpenseItem key={index} {...item} editHandler={editHandler} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Transactions