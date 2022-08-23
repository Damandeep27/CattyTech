import { useEffect } from 'react'
import React from 'react'
import { HStack,useToast, Box, Flex, ScaleFade, VStack, Text, InputGroup, InputLeftElement, Input, Button, Alert, AlertIcon, Image, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { FiMail } from 'react-icons/fi'
import { useUser } from '../../../providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useCore } from '../../../providers/CoreProvider'
import img from '../../../images/logo.png'
import { FaRegBell } from 'react-icons/fa'

const LoginContents = () => {
    const { setToken, getAccessToken } = useCore();
    const { email, setEmail, LoginAsGuest, isEmailWrong, protectLoginPage, isCustomer, setIsLoggedIn } = useUser();
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);
    const { token } = query;
    const toast = useToast();

    useEffect(() => {
        if (!protectLoginPage) return;
        protectLoginPage();
    }, [protectLoginPage])

    useEffect(() => {
        if (!token) return;
        const parsedToken = token.substring(1);
        setToken(parsedToken);
        setIsLoggedIn(true);
        setEmail(localStorage.getItem('cattytech-email'));
        getAccessToken(parsedToken);
        toast({
            title: 'Success',
            description: `Successfully logged with token ${parsedToken}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }, [token])
    
    return (
        <>
        <Box>
            <Flex justifyContent='center' alignItems='center' h='100vh'>
                <ScaleFade initialScale={0.9} in={true} delay={.25}>
                    <VStack
                        maxW='400px' 
                        w='full'
                        alignItems='flex-start'
                        spacing='1.5em'
                    ><HStack align="end">
                        <Image 
                            src={img} 
                            alt='Catty Tech Logo'
                            w="25%"
                        />
                        <Text fontSize='32pt' fontWeight='500' color='rgb(147, 3, 163)'>Catty Tech</Text>

                    </HStack>
                        <VStack 
                            w='full'
                            bg='rgb(17, 20, 28)'
                            borderRadius='10px'
                            boxShadow='rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px'
                            p='1.5em'
                            justifyContent='center'
                            spacing='1.5em'
                        >
                            <Box id="box" >
                            <Text fontSize='32pt' fontWeight='500'>
                                Log in
                            </Text>
                            {isCustomer && (
                                <Alert status='info'>
                                    <AlertIcon />
                                    Customer Detected, please check your email to login.
                                </Alert>
                            )}
                            <FormControl isRequired isInvalid={isEmailWrong}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none' children={<FiMail color='gray.300' />} />
                                    <Input id='email' type='email' placeholder='you@domain.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </InputGroup>
                               
                                {isEmailWrong && (
                                    <FormErrorMessage>
                                        <FormErrorMessage>Email is required.</FormErrorMessage>
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            </Box>
                            <Button w='full' onClick={LoginAsGuest} id='login-guest-btn'>
                                Login as guest
                            </Button>
                        </VStack>
                    </VStack>     
                </ScaleFade>
            </Flex>
        </Box>
        </>
    )
}

export default LoginContents