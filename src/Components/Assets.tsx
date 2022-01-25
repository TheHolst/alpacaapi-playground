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
    assetBox: {
        borderRadius: 5,
        border: '1px solid #666',
        padding: 8,
    }
  }));
const Assets = () => {
    const classes = useStyles();
    const [assets, setAssets] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        axios.get('http://localhost:8000/account/positions').then(res => {
            setAssets(res.data);
            setLoading(false)
        })
    }, [])
    if(loading) return <>Loading account...</>;
    return (
        <>
        <Typography variant="h2" className={classes.title}>Assets</Typography>
        {assets && <Grid container spacing={2}>
            {assets.map((asset: any) => {
                return (
                    <Grid item xs={2}>
                        <Box className={classes.assetBox}>
                            <Typography variant='h6'>{asset.symbol}</Typography>
                            <Typography variant='body2'>Owned: {asset.qty}</Typography>
                            <Typography variant='body2'>Average entry price: {parseFloat(asset?.avg_entry_price).toFixed(2)}</Typography>
                            <Typography variant='body2'>Current price: {asset.market_value}</Typography>
                        </Box>
                    </Grid>
                )
            })}
        </Grid>}
        </>
    )
}
export default Assets;