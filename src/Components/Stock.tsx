import { TextField, Button, Typography, Grid, Card, CardContent, CardActions, IconButton, CircularProgress } from '@material-ui/core'
import { alpacaRequest, alpacaRequestData, getStocks } from '../helpers/alpacaFunctions';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { RemoveCircleOutlineRounded, AddCircleOutlineRounded} from '@material-ui/icons';
import axios from 'axios';
const useStyles = makeStyles(() => createStyles({
	root: {
		minWidth: 275,
	},
	pos: {
		marginBottom: 12,
	},
	title: {
		fontSize: 14,
	},
	stockContainer: {
		padding: '24px 0'
	}
}));
const Stock = () => {
	const classes = useStyles();
	const params = useParams();
	const [price, setPrice] = useState(100);
	const [quantity, setQuantity] = useState(0);
	const [owned, setOwned] = useState(null);
	const [loading, setLoading] = useState(true);

	const increment = () => {
		setQuantity(quantity + 1);
	}
	const decrement = () => {
		setQuantity(quantity - 1);
	}
	const buy = async () => {
		const response = await axios.post(`http://localhost:8000/stocks/${params.ticker}/buy`, { qty: quantity });
		console.log(response.data)
	}
	useEffect(() => {
		setLoading(true)
		axios.get(`http://localhost:8000/stocks/${params.ticker}`).then(res => {
			setPrice(res?.data?.latestTrade?.p);
			setOwned(res?.data?.qty)
			setLoading(false)
		}).catch(err => {
			console.log(err);
		})
	}, [params])
	return (
		<>
			<Grid container spacing={2} justifyContent='center' alignContent='center' className={classes.stockContainer}>
				<Grid item>
					<Card className={classes.root}>
						<CardContent>
							{owned && <Typography className={classes.title} color='textSecondary' gutterBottom>
								Currently own: {owned}
							</Typography>}
							<Typography variant='h5' component='h2'>
								{params?.ticker}
							</Typography>
							{loading && <div style={{ textAlign: 'center'}}><CircularProgress color='primary'/></div>}
							{!loading && <Typography className={classes.pos} color='textSecondary'>
								Price: ${price}
							</Typography>}
						</CardContent>
						<CardActions>
							<IconButton onClick={decrement}><RemoveCircleOutlineRounded color='primary'/></IconButton>
							<Typography variant='body2' component='p'>{quantity}</Typography>
							<IconButton onClick={increment}><AddCircleOutlineRounded color='primary'/></IconButton>
							<Button variant='outlined' color='primary' onClick={buy}>Buy</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</>
	)
}
export default Stock;