import React from 'react';
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";
import ProductCotent from '../components/pages/product'


const Product = props => {

    return (
      
    <>
         <Box className='product'>
          <Helmet>
              <title>Product | Catty Tech</title>
          </Helmet>
          <Navbar />
          <ProductCotent />
          
          <Footer />
          
        </Box>
    </>
      );
}

export default Product;