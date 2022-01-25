import { TextField, Button, Typography, Grid, Box } from '@material-ui/core'
import { alpacaRequest, getStocks } from '../helpers/alpacaFunctions';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import axios from 'axios';
const useStyles = makeStyles(() => createStyles({
    title: {
        padding: '16px 4px',
    },
    orderBox: {
        borderRadius: 5,
        border: '1px solid #666',
        padding: 8,
    },
  }));
const Orders = () => {
    const classes = useStyles();
    const [orders, setOrders] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1)
    useEffect(() => {
        axios.get('http://localhost:8000/account/orders').then(res => {
            setOrders(res.data);
            setLoading(false)
        })
    }, [])
    if(loading) return <>Loading account...</>;
    return (
        <>
        <Typography variant="h2" className={classes.title}>Orders</Typography>
        {orders && <Grid container spacing={2}>
            {orders.map((order: any) => {
                return (
                    <Grid item xs={2}>
                        <Box className={classes.orderBox}>
                            <Typography variant='h6'>{order.symbol}</Typography>
                            <Typography variant='body2' style={{ fontWeight: 500 }}>{capitalize(order.side)}</Typography>
                            <Typography variant='body2'>Quantity: {order.qty} @Price: {order.status === 'filled' ? parseFloat(order.filled_avg_price).toFixed(2) : order.type}</Typography>
                            <Typography variant='body2'>Status: <span style={{ color: order.status === 'filled' ? 'green' : order.status === 'accepted' ? 'orange' : 'red' }}>{order.status}</span></Typography>
                        </Box>
                    </Grid>
                )
            })}
        </Grid>}
        </>
    )
}
export default Orders;