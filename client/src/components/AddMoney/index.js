import React, {useState} from "react";
import { AddMoneyMutation } from "../../hooks/addMoney";

export default function AddMoney() {
    const { mutateAsync } = AddMoneyMutation();
    const pay = () => {mutateAsync({amount:document.getElementById("inputMoney").value})} 
    return (
        <>
        <div className="row" >
            <div className="col-auto align-middle" >
                <input type="string" className="form-control" id="inputMoney" placeholder="2.35"/>
            </div>
            <div className="col-auto align-middle">
                <button type="submit" className="btn btn-primary mb-2" onClick={pay}>Pay</button>
            </div>
        </div>
            </>
    );
}