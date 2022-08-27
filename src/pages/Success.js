import React from 'react';
import { Box, Flex, Text, VStack, HStack, Button, Tag } from '@chakra-ui/react'
import { RiShoppingBagFill } from 'react-icons/ri'
import { useCore } from '../providers/CoreProvider'
import { BiArrowBack } from 'react-icons/bi'
import {Helmet} from "react-helmet"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Success = () => {

    const {
        paymentName,
        paymentLastName,
        checkoutData,
        goBackToCategories,
        paymentMethodId,
        paymentData,
        paymentDiscount
    }
    = useCore();

    return (
        <Box>
            <Helmet>
                <title>Success | Catty Tech</title>
            </Helmet>
            <Navbar />
                <Flex h='500px' mt='4em' justifyContent='center' alignItems='center'>
                    <Flex maxW='8xl' w='full' px='24px' justifyContent='center'>
                        <VStack> 
                            <HStack>
                                <Text fontSize='28pt'>
                                    Successfully Purchased Order
                                </Text>
                                <RiShoppingBagFill fontSize='36pt' color='green' />
                            </HStack>
                            <Flex p='1em' flexDir='column' alignItems='center'>
                                <Text>
                                    Thanks for buying <Tag>{paymentName} {paymentLastName}</Tag>
                                </Text>
                                <Text mt='1em'>
                                    Checkout ID: <Tag>{checkoutData?.id}</Tag>
                                </Text>
                                <Text mt='.5em'>
                                    Payment Method ID: <Tag>{paymentMethodId}</Tag>
                                </Text>
                                <Text mt='.5em'>
                                    Total Amount Paid: <Tag> ${paymentData?.price}</Tag>
                                    {paymentDiscount?.length > 0 && (
                                        <>
                                            - <Tag bg='green'>$10 Discount</Tag>
                                        </>
                                    )}
                                </Text>
                                {paymentDiscount?.length > 0 && (
                                    <Text mt='.5em'>
                                        Discount Code: <Tag>{paymentDiscount}</Tag>
                                    </Text>
                                )}

                                <Button 
                                 mt='3em'
                                _hover={{
                                    color: 'black',
                                    bg:"rgb(224, 224, 209)"
                                    
                                }} 
                                color="white" 
                                rightIcon={<BiArrowBack />}
                                onClick={goBackToCategories} 
                                bg='rgb(147, 3, 163)' 
                                size='lg'>
                                    Go Back To Categories
                                </Button>
                            </Flex>
                        </VStack>
                    </Flex>
                </Flex>
            <Footer />
        </Box>
    )
}

export default Success