import React from 'react';
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";
import ShopContents from '../components/pages/shop'


const Shop = props => {

    return (
      
    <>
         <Box className='shop'>
          <Helmet>
              <title>Shop | Catty Tech</title>
          </Helmet>
          <Navbar />
          <ShopContents />
          <Footer />
          
        </Box>
    </>
      );
}

export default Shop;