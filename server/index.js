const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: '../.env' })
app.use(cors());
app.use(express.json())
const port = 8000

const configuration = {
    "APCA-API-KEY-ID": process.env.REACT_APP_API_KEY,
    "APCA-API-SECRET-KEY": process.env.REACT_APP_SECRET_KEY,
}
const headers = {
    headers: {
        ...configuration,
    }
};
// Get account data
app.get('/account', async (req, res) => {
    const { data } = await axios.get(`https://paper-api.alpaca.markets/v2/account`, headers);
    res.send(data);
})
// Get current positions for account
app.get('/account/positions', async (req, res) => {
    const { data } = await axios.get(`https://paper-api.alpaca.markets/v2/positions`, headers);
    res.send(data);
})
// Get all orders for account
app.get('/account/orders', async (req, res) => {
    const { data } = await axios.get(`https://paper-api.alpaca.markets/v2/orders?status=all`, headers);
    res.send(data);
})
// Get info of latest trade on a stock
app.get('/stocks/:ticker/latest', async (req, res) => {
    const { data } = await axios.get(`https://data.alpaca.markets/v2/stocks/${req.params.ticker}/trades/latest`, headers);
    res.send(data);
})
// Get info about a stock
app.get('/stocks/:ticker', async (req, res) => {
    const { data } = await axios.get(`https://data.alpaca.markets/v2/stocks/${req.params.ticker}/snapshot`, headers);
    let positionData = {}
    try {
        positionData = await axios.get(`https://paper-api.alpaca.markets/v2/positions/${req.params.ticker}`, headers);
    } catch (error) {
        console.log('No positions');
        res.status(404).send('No positions found');
        return;
    }
    res.send({...data, ...positionData?.data});
})
// Create a buy order for a stock
app.post('/stocks/:ticker/buy', async (req, res) => {
    const body = {
        symbol: req.params.ticker,
        qty: req.body.qty,
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
    };
    try {
        const result = await axios.post(`https://paper-api.alpaca.markets/v2/orders`, body, 
            {
                headers: {
                    ...configuration,
                }
            }
        );
        res.send(result);

    } catch (error) {
        console.error('Something went wrong');
        res.status(500).send(error?.message);
    }
    return;
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})