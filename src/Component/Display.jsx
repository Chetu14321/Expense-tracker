import React from "react";

function Display(props) {
    return(
        <div className="dashboard">
            <div className="dashhboard-top">
                <div className="dashboard-top-left">
                <p>Your Balance</p>
                <h1 id="balance"> &#8377; {props.bal} </h1>
                </div>
            </div>

            <div className="dashboard-bottom">
                <div className="dashboard-bottom-left">
                <p>Income</p>
                <h1 id="income"> &#8377; {props.incm} </h1>
                </div>
                <div className="dashboard-bottom-right">
                    <p>Expense</p>
                    <h1 id="expense"> &#8377; {props.expn} </h1>
                </div>
            </div>
        </div>
    )
}

export default Display