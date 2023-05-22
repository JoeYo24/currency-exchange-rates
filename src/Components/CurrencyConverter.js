import React from "react";
import Currencies from "./Currencies";

const CurrencyConverter = () => {
    return (
        <div>
            <label className="label">Amount</label>
            <input className="" name="amount" type="number" value="1.00"></input>
            <label className="label">From</label>
            <select id="currencies">
                <Currencies />
            </select>
            <label className="label">To</label>
            <select id="currencies">
                <Currencies />
            </select>
        </div>
    );
};
export default CurrencyConverter;