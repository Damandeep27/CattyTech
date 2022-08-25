import React from 'react';
import { Box } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Helmet} from "react-helmet";
import LandingContents from '../components/pages/landing'


const Home = props => {

    return (
      
    <>
         <Box className='home'>
          <Helmet>
              <title>Catty tech | Home </title>
          </Helmet>
          <Navbar isLanding isHome={false}/>
          <LandingContents />
          <Footer />
          
        </Box>
    </>
      );
}

export default Home;