import React, { useState, useEffect } from "react";
import { json, checkStatus } from "./utils";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1.00);
    const [total, setTotal] = useState(0.00);
    const [currencies, setCurrencies] = useState({});
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        fetch('https://api.frankfurter.app/currencies')
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (data.AUD) {
                    console.log(data);
                    setCurrencies(data);
                    setFrom(Object.keys(data)[0]);
                    setTo(Object.keys(data)[1]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    function amountHandleChange(event) {
        setAmount(event.target.value);
    }

    function fromHandleChange(event) {
        setFrom(event.target.value);
    }

    function toHandleChange(event) {
        setTo(event.target.value);
    }

    const totalAmount = () => {
        fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                console.log(data);
                setTotal(data.rates[to] * amount);
            })
            .catch((error) => { console.log(error) })
    };

    const handleConvert = () => {
        totalAmount();
    };

    if (!Object.keys(currencies).length) {
        return null;
    }

    const currencyOptions = Object.keys(currencies).map((currency, index) => {
        return <option key={currency} value={currency}>{currency}</option>;
    });

    return (
        <div id="currencyconverter">
            <label className="label">Amount</label>
            <input className="input" name="amount" type="number" value={amount} onChange={amountHandleChange}></input>
            <label className="label">From</label>
            <select value={from} onChange={fromHandleChange}>
                {currencyOptions}
            </select>
            <label className="label">To</label>
            <select value={to} onChange={toHandleChange}>
                {currencyOptions}
            </select>
            <button className="btn btn-primary is-primary" onClick={handleConvert}>Convert</button>
            <h4>Total = {total}</h4>
        </div>
    );
};



export default CurrencyConverter;