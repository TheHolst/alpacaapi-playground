import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => createStyles({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: 16,
      },
      appbar: {
          width: '100vw',
          position: 'fixed',
          background: '#333',
          top: 0,
          left: 0,
      },
      menuLink: {
          color: '#fff',
          textDecoration: 'none',
          margin: '0 16px',
      }
  }));
const Navbar = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
            <Toolbar variant="dense" className={classes.appbar}>
                <IconButton edge="start" className={classes.menuButton} color='inherit'  aria-label="menu">
                <Link to='/'><HomeIcon style={{ color: '#fff' }}/></Link>
                </IconButton>
                <Link to='/stocks'><Typography variant="h6" className={classes.menuLink}>Stocks</Typography></Link>
                <Link to='/orders'><Typography variant="h6" className={classes.menuLink}>Orders</Typography></Link>
                <Link to='/assets'><Typography variant="h6" className={classes.menuLink}>Assets</Typography></Link>
            </Toolbar>
            </AppBar>
        </>
    )
}
export default Navbar;