import React, { useState, useEffect } from "react";
import { json, checkStatus } from "../utils";

const SecondTab = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=USD')
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
  }, []);

  const ratesDivs1 = rates.map((rate, index) => {
    return <li value={rate.currency} key={index}>{rate.currency}: {rate.rate}</li>
  })

  // Splitting `ratesDivs1` into even 8 columns using Bootstrap grid system
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
            <li>Base Currency = USD: 1.00</li>
          </ul>
        </div>
        {ratesColumns}
      </div>
    </div>
  );
};

export default SecondTab;