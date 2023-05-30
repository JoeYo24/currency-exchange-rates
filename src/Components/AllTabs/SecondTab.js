import React, { useState, useEffect } from "react";
import { json, checkStatus } from "../utils";

const SecondTab = () => {
  const [rates, setRates] = useState([]);
  const [currencyArray, setCurrencyArray] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [base, setBase] = useState(1.00);

  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        if (data) {
          const currencyArray = Object.keys(data).map((currency) => currency);
          setCurrencyArray(currencyArray);
          console.log(currency);
        }}
      )
      .catch((error) => {
        console.log(error);
      })}, []);

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${currency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        console.log(data.rates);
        if (data.rates) {
          const ratesArray = Object.entries(data.rates).map(([currency, rate]) => ({
            currency,
            rate
          }));
          setRates(ratesArray);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [currency]);

  const columnSize = Math.ceil(rates.length / 8);
  const ratesColumns = [];
  
  for (let i = 0; i < rates.length; i += columnSize) {
    const columnRates = rates.slice(i, i + columnSize);
    
    const columnDivs = columnRates.map((rate, index) => (
      <li value={rate.currency} key={index}>{rate.currency}: {rate.rate}</li>
    ));
    
    ratesColumns.push(
      <div className="col" key={i}>
        <ul>{columnDivs}</ul>
      </div>
    );
  }

  return (
    <div className="SecondTab container">
      <div className="row">
        <div>
          <ul id="firstli">
            <li>Base Currency =
              <span>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  {currencyArray.map((currencyOption, index) => (
                    <option value={currencyOption} key={index}>{currencyOption}</option>
                  ))}
                </select>: {base.toFixed(2)}
              </span>
            </li>
          </ul>
        </div>
        {ratesColumns}
      </div>
    </div>
  );
};

export default SecondTab;