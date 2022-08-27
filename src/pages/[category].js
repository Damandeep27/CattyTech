import React from 'react';
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";
import Products from '../components/pages/category'


const Category = props => {

    return (
      
    <>
         <Box className='category'>
          <Helmet>
              <title>Category | Catty Tech</title>
          </Helmet>
          <Navbar />
          <Products />
          
          <Footer />
          
        </Box>
    </>
      );
}

export default Category;