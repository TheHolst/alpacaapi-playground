import React from 'react';
import { Box, Container, Divider, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import SearchStock from './Components/SearchStock';
import Stock from './Components/Stock';
import { Routes, Route, Link } from "react-router-dom";
import Account from './Components/Account';
import Assets from './Components/Assets';
import Orders from './Components/Orders';
import Navbar from './Components/Navbar';
const useStyles = makeStyles(() => createStyles({
  contentContainer: {
    padding: '16px 32px',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" style={{ paddingTop: '64px' }}>
      <Navbar />
      <Typography variant="h1">Trading</Typography>
      <Divider />
      <Box className={classes.contentContainer}>
        <Account />
        <Divider />
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/assets' element={<Assets />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='stocks' element={<SearchStock />}>
            <Route path=':ticker' element={<Stock />}/>
          </Route>
        </Routes>
      </Box> 
    </Container>
  );
}

export default App;
