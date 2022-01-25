import axios from 'axios'

const configuration = {
    "APCA-API-KEY-ID": process.env.REACT_APP_API_KEY,
    "APCA-API-SECRET-KEY": process.env.REACT_APP_SECRET_KEY,
}
const baseUrl = process.env.REACT_APP_APCA_API_BASE_URL;

const alpacaRequest = async (method: any, endpoint: string, body: any = {}, headers: any = {}) => {
    return await axios.request({
        method: method,
        baseURL: baseUrl,
        url: endpoint,
        data: body,
        headers: {
            'Access-Control-Allow-Origin': '*',
            ...configuration,
            ...headers,
        }
    })
}
const alpacaRequestData = async (method: any, endpoint: string, body: any = {}, headers: any = {}) => {
    return await axios.request({
        method: method,
        baseURL: 'https://data.alpaca.markets/v2',
        url: endpoint,
        data: body,
        headers: {
            ...configuration,
            ...headers,
        }
    })
}
const getStocks = () => {
    return ['AAPL', 'MSFT', 'AMZN', 'FB', 'GOOG', 'TSLA', 'AMD'];
}
export {
    alpacaRequest,
    getStocks,
    alpacaRequestData
}