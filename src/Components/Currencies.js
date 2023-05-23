import React from "react";
import { json, checkStatus } from "./utils"

class Currencies extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            currencies: null,
            error: ''
        }
    }
    currencies() {
        fetch('https://api.frankfurter.app/currencies')
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (data.Response === 'False') {
                    throw new Error(data.Error);
                }
                if (data.Response === 'True') {
                    console.log(data);
                    this.setState({ currencies: data, error: '' })
                }
            })
            .catch((error) => {
                this.setState({ error: error.message });
                console.log(error);
            })
    }
    render() {
        if (!this.state.currencies) {
            return null;
    }
    const currencies = Object.keys(this.state.currencies);
    return (
            <select>
                {currencies.map(option => (
                    <option key={option} value={option}>Hi</option>
                ))}
            </select>
        )
    }
}
export default Currencies;