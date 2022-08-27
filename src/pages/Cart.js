import React from 'react';
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";
import CartContent from '../components/pages/cart'


const Cart = props => {

    return (
      
    <>
         <Box className='cart'>
          <Helmet>
              <title>Cart | Catty Tech</title>
          </Helmet>
          <Navbar />
          <CartContent /> 
          
          <Footer />
          
        </Box>
    </>
      );
}

export default Cart;