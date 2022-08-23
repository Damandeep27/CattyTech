import { Flex, Text, VStack, Image, Box } from '@chakra-ui/react'
import React from 'react';
import img from '../images/logoW.png';

const Footer = () => {
    return (
        <Flex h='500px' bg=' rgb(255, 102, 0)' mt='10em' justifyContent='center' alignItems='center' className="footer">
            <Flex maxW='8xl' w='full' px='24px' justifyContent='space-between'>
                <VStack alignItems='flex-start'>
                    <Image
                        src={img} 
                        alt='Catty Tech Logo'
                        w='100px'
                    />
                    <Text>
                        Copyright &copy; 2022 Catty Tech Ltd.
                    </Text>
                    <Text color='whiteAlpha.400'>
                        All rights reserved.
                    </Text>
                </VStack>
                <VStack alignItems='flex-start'>
                    <Text>
                        Owner
                    </Text>
                    <Text color='whiteAlpha.400'>
                        Damandeep Singh
                    </Text>
                    
                </VStack>
            </Flex>
        </Flex>
    )
}

export default Footer