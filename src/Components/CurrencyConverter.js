import React from "react";
import Chart from 'chart.js/auto';
import { json, checkStatus } from "./utils";

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 1.00,
            total: 0.00,
            currencies: {},
            from: '',
            to: '',
            chartInstance: null
        };
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        fetch('https://api.frankfurter.app/currencies')
            .then(checkStatus)
            .then(json)
            .then((data) => {
                if (data.AUD) {
                    console.log(data);
                    this.setState({
                        currencies: data,
                        from: Object.keys(data)[0],
                        to: Object.keys(data)[1]
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
            const { from, to } = this.state;
            this.getHistoricalRates(from, to);
            this.totalAmount(from, to);
    }

    amountHandleChange = (event) => {
        this.setState({ amount: event.target.value });
    }

    fromHandleChange = (event) => {
        this.setState({ from: event.target.value });
        this.getHistoricalRates(event.target.value, this.state.to)
    }

    toHandleChange = (event) => {
        this.setState({ to: event.target.value });
        this.getHistoricalRates(this.state.from, event.target.value); 
    }

    totalAmount = () => {
        fetch(`https://api.frankfurter.app/latest?from=${this.state.from}&to=${this.state.to}`)
            .then(checkStatus)
            .then(json)
            .then((data) => {
                console.log(data);
                this.setState({
                    total: data.rates[this.state.to] * this.state.amount
                });
            })
            .catch((error) => { console.log(error) })
    };

    handleConvert = () => {
        this.totalAmount();
    };

    getHistoricalRates = (from, to) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${from}&to=${to}`)
            .then(checkStatus)
            .then(json)
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                console.log(data);
                const chartLabels = Object.keys(data.rates);
                const chartData = Object.values(data.rates).map(rate => rate[to]);
                const chartLabel = `${from}/${to}`;
                this.buildChart(chartLabels, chartData, chartLabel);
            })
            .catch(error => console.error(error.message));
    }

    buildChart = (labels, data, label) => {
        const chartContext = this.chartRef.current.getContext('2d');
    
        if (this.state.chartInstance !== null) {
            this.state.chartInstance.destroy();
        }

        this.setState({
            chartInstance: new Chart(chartContext, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: label,
                        data,
                        fill: false,
                        tension: 0,
                    }]
                },
                options: {
                    responsive: true,
                }
            })
        });
    }

    render() {
        if (!Object.keys(this.state.currencies).length) {
            return null;
        }

        const currencyOptions = Object.keys(this.state.currencies).map((currency, index) => {
            return <option key={currency} value={currency}>{currency}</option>;
        });

        return (
            <div id="currencyconverter">
                <label className="label">Amount</label>
                <input className="input" name="amount" type="number" value={this.state.amount} onChange={this.amountHandleChange}></input>
                <label className="label">From</label>
                <select value={this.state.from} onChange={this.fromHandleChange}>
                    {currencyOptions}
                </select>
                <label className="label">To</label>
                <select value={this.state.to} onChange={this.toHandleChange}>
                    {currencyOptions}
                </select>
                <button className="btn btn-primary is-primary" onClick={this.handleConvert}>Convert</button>
                <h4>Total = {this.state.total}</h4>
                <canvas ref={this.chartRef} className="chart" />
            </div>
        );
    }
}

export default CurrencyConverter;