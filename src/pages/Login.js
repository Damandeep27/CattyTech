import React from 'react';
import { Box } from '@chakra-ui/react'
import LoginContents from '../components/pages/login'
import {Helmet} from "react-helmet";


const Login = props => {

    return (
      
    <>
         <Box className='login'>
          <Helmet>
              <title>Login | Catty Tech</title>
          </Helmet>
          
          <LoginContents />
          
        </Box>
    </>
      );
}

export default Login;