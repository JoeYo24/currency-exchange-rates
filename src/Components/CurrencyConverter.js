import React, { useState } from "react";
import Currencies from "./Currencies";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1.00);
    const [total, setTotal] = useState(0.00);

    const amountHandleChange = (event) => {
        setAmount(event.target.value);
    };

    const handleConvert = () => {
        // Logic to convert currencies
        //setTotal(convertedAmount);
    };

    return (
        <div>
            <label className="label">Amount</label>
            <input className="input" name="amount" type="number" value={amount} onChange={amountHandleChange}></input>
            <label className="label">From</label>
            <Currencies />
            <label className="label">To</label>
            <Currencies />
            <button className="btn btn-primary is-primary" onClick={handleConvert}>Convert</button>
            <h4>Total = <span>{total}</span></h4>
        </div>
    );
};



export default CurrencyConverter;