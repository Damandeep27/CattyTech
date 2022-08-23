import React from 'react';
import { Box } from '@chakra-ui/react'
import LoginContents from '../components/pages/login'
import {Helmet} from "react-helmet";


const Home = props => {

    return (
      
    <>
         <Box className='home'>
          <Helmet>
              <title>Login | Catty Tech</title>
          </Helmet>
          
          <LoginContents />
          
        </Box>
    </>
      );
}

export default Home;