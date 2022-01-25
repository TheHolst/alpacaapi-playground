import { TextField, Button, Typography, Grid } from '@material-ui/core'
import { alpacaRequest, getStocks } from '../helpers/alpacaFunctions';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import axios from 'axios';
const useStyles = makeStyles(() => createStyles({
    stockTickers: {
      padding: '8px 4px',
    }
  }));
const Account = () => {
    const classes = useStyles();
    const [accountInfo, setAccountInfo] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        axios.get('http://localhost:8000/account').then(res => {
            setAccountInfo(res.data);
            setLoading(false)
        })
    }, [])
    if(loading) return <>Loading account...</>;
    return (
        <Grid container>
            <Grid container item justifyContent='flex-start'>
                <Grid item xs={3}><Typography variant="h6">Account Number:</Typography></Grid>
                <Grid item><Typography variant="h6" style={{ fontStyle: 'italic', fontWeight: 300 }}>{accountInfo?.account_number}</Typography></Grid>
            </Grid>
            <Grid container item justifyContent='flex-start'>
                <Grid item xs={3}><Typography variant="h6">Total Portfolio value:</Typography></Grid>
                <Grid item><Typography variant="h6" style={{ fontWeight: 300 }}>${accountInfo?.portfolio_value}</Typography></Grid>
            </Grid>
            <Grid container item justifyContent='flex-start'>
                <Grid item xs={3}><Typography variant="h6">Cash:</Typography></Grid>
                <Grid item><Typography variant="h6" style={{ fontWeight: 300 }}>${accountInfo?.cash}</Typography></Grid>
            </Grid>
            <Grid container item justifyContent='flex-start'>
                <Grid item xs={3}><Typography variant="h6">Market Equity:</Typography></Grid>
                <Grid item><Typography variant="h6" style={{ fontWeight: 300 }}>${accountInfo?.long_market_value}</Typography></Grid>
            </Grid>
        </Grid>
    )
}
export default Account;