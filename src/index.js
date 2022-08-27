import './style.css';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import App from './App.js';
import { CoreProvider } from './providers/CoreProvider'
import { UserProvider } from './providers/UserProvider'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/theme'
import { ColorModeScript } from '@chakra-ui/react'


ReactDOM.render((
  
  <ChakraProvider theme={theme}>
        <BrowserRouter>
            <CoreProvider>
                <UserProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                  <App /> 
                  </UserProvider>
            </CoreProvider>
            </BrowserRouter>
        
    </ChakraProvider>
    
  
  ), document.getElementById('react-container')
);