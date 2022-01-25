import { TextField, Button, Typography, Grid } from '@material-ui/core'
import { alpacaRequest, getStocks } from '../helpers/alpacaFunctions';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";
const useStyles = makeStyles(() => createStyles({
    title: {
        padding: '16px 4px',
    },
    stockTickers: {
      padding: '8px 4px',
    }
  }));
const SearchStock = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [stocks, setStocks] = React.useState<String[]>([]);
    const [visibleStocks, setVisibleStocks] = React.useState<String[]>([]);
    useEffect(() => {
        const s = getStocks();
        setStocks(s);
        setVisibleStocks(s);
    }, [])
    const search = async (overrideVal?: boolean) => {
        if(value === '' || overrideVal) setVisibleStocks(stocks);
        else {
            let newVal = stocks.filter((val) => val === value.toUpperCase())
            setVisibleStocks(newVal);
        }
    }

    return (
        <>
        <Typography variant="h3" className={classes.title}>Find stocks</Typography>
        <Grid container spacing={2} justifyContent='flex-start' alignContent='center' className={classes.stockTickers}>
            <Grid item key={'home'}><Link to={`/`} style={{textDecoration: 'none'}}><Button variant='outlined' style={{ color: '#fff', borderColor: 'red', backgroundColor: 'red', }} onClick={() => search(true)}>Home</Button></Link></Grid>
            {visibleStocks.map((s, index) => {
                return (<Grid item key={index}><Link to={`/stocks/${s}`}><Button variant='outlined' color='primary'>{s}</Button></Link></Grid>);
            })}
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    variant='outlined'
                    label='Search stocks'
                    id='margin-none'
                    placeholder='Search stock...'
                    value={value}
                    color='primary'
                    onChange={(event) => setValue(event.target.value)}
                    fullWidth />
            </Grid>
            <Grid item><Button variant='outlined' color='primary' style={{ height: '100%' }} onClick={() => search(false)}>Search</Button></Grid>
        </Grid>
        <Outlet />
        </>
    )
}
export default SearchStock;