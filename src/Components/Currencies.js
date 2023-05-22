import React from "react";
import { json, checkStatus } from "./utils"

class Currencies extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            currencies: [],
        }
    }
    componentDidMount () {
        fetch('https://api.frankfurter.app/currencies').then(checkStatus).then(json).then((data) => {
            if (data.Response === 'False') {
                throw new Error(data.Error);
            }
            if (data.Response === 'True') {
                console.log(data);
                this.setState({ currencies: [data], error: '' })
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
        const currencies = this.state.currencies
    }
}
export default Currencies;