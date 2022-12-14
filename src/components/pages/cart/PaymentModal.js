import { Modal, ModalOverlay, ModalContent, 
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Text, Input,
    FormControl, FormLabel, VStack, HStack, 
    Box, Menu, MenuButton, MenuList,
    MenuItem, Image, MenuGroup, Select
} from '@chakra-ui/react'
import { useCore } from '../../../providers/CoreProvider'
import { FaChevronDown } from 'react-icons/fa'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

const PaymentModal = () => {
    const { 
        paymentModalState, 
        setPaymentModalState, 
        paymentData, 
        checkoutItem,
        paymentName,
        setPaymentName,
        paymentAddress,
        setPaymentAddress,
        paymentCity,
        setPaymentCity,
        paymentState,
        setPaymentState,
        paymentZip,
        setPaymentZip,
        paymentCountry,
        setPaymentCountry,
        isPaying,
        setPaymentLastName,
        paymentLastName,
        shippingCountries,
        shippingCountry,
        shippingSubdivisions,
        shippingSubdivision,
        shippingOptions,
        shippingOption,
        setShippingCountry,
        setShippingSubdivision,
        setShippingOption,
        paymentEmail,
        setPaymentEmail,
        paymentDiscount,
        setPaymentDiscount
    } = useCore();

    const stripe = useStripe();
    const elements = useElements();

    return (
        <>
        
        <Modal onClose={() => setPaymentModalState(false)} isOpen={paymentModalState} isCentered size='xl'>
            <ModalOverlay />
            <ModalContent  >
                <ModalHeader mt ="5em" >
                    Checkout Item
                    <Text fontSize='10pt' fontWeight='normal' color='whiteAlpha.600'>
                    
                    </Text>
                 
                </ModalHeader>
                <ModalCloseButton  mt="7 em" />

                
                <ModalBody>
                    <VStack>
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                                <Input id='firstName' type='text' placeholder='Jane' value={paymentName} onChange={(e) => setPaymentName(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                                <Input id='lastName' type='text' placeholder='Doe' value={paymentLastName} onChange={(e) => setPaymentLastName(e.target.value)} />
                            </FormControl>
                        </HStack>
                        <FormControl isRequired>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input id='email' type='email' placeholder='you@mail.com' value={paymentEmail} onChange={(e) => setPaymentEmail(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor='address'>Address</FormLabel>
                            <Input id='address' type='text' placeholder='4796 Roosevelt Road' value={paymentAddress} onChange={(e) => setPaymentAddress(e.target.value)} />
                        </FormControl>
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel htmlFor='city'>City</FormLabel>
                                <Input id='city' type='text' placeholder='Moundridge' value={paymentCity} onChange={(e) => setPaymentCity(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='state'>State</FormLabel>
                                <Input id='state' type='text' placeholder='Kansas' value={paymentState} onChange={(e) => setPaymentState(e.target.value)} />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel htmlFor='country'>Country</FormLabel>
                                <Input id='country' type='text' placeholder='United States' value={paymentCountry} onChange={(e) => setPaymentCountry(e.target.value)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='zip'>ZIP</FormLabel>
                                <Input id='zip' type='text' placeholder='69273' value={paymentZip} onChange={(e) => setPaymentZip(e.target.value)} />
                            </FormControl>
                        </HStack>
                        <HStack w='full'>
                            {shippingCountries && (
                                <FormControl isRequired>
                                    <FormLabel htmlFor='shippingCountry'>Shipping Country</FormLabel>
                                    <Select placeholder='Shipping Country' value={shippingCountry} w='full' onChange={(e) => setShippingCountry(e.target.value)}>
                                        {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            {shippingSubdivisions && (
                                <FormControl isRequired>
                                    <FormLabel htmlFor='shippingSubdivision'>Shipping Province</FormLabel>
                                    <Select placeholder='Shipping Subdivision' value={shippingSubdivision} w='full' onChange={(e) => setShippingSubdivision(e.target.value)}>
                                        {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </HStack>
                        <HStack w='full'>
                            <FormControl>
                                <FormLabel htmlFor='country'>Shipping Option</FormLabel>
                                <Select placeholder='Shipping Option' value={shippingOption} w='full' onChange={(e) => setShippingOption(e.target.value)}>
                                    {shippingOptions?.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` })).map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.label}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='discount'>Discount Code</FormLabel>
                                <Input id='discount' type='text' placeholder='Code' value={paymentDiscount} onChange={(e) => setPaymentDiscount(e.target.value)} />
                            </FormControl>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <VStack w='full' spacing='1em'>
                        <Box w='full' bg='rgb(26,32,44)' borderRadius='10px' p='5'>
                            <CardElement options={{ 
                                hidePostalCode: true, 
                                style: { 
                                    base: {
                                        color: 'white'
                                    }
                                } 
                            }} />
                        </Box>
                        <Menu closeOnSelect={true}>
                            <MenuButton as={Button} bg='black' _hover={{ bg: 'rgba(0,0,0,0.8)' }} w='full' rightIcon={<FaChevronDown />} disabled={isPaying}>
                                Pay $
                                {paymentData?.price}
                                &nbsp;with
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Bank Card'>
                                    <MenuItem onClick={() => checkoutItem(stripe, elements, CardElement)}>
                                        <HStack>
                                            <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src='https://cdn.iconscout.com/icon/free/png-256/stripe-2-498440.png'
                                                alt='Stripe'
                                                mr='12px'
                                            />
                                            <VStack alignItems='flex-start' spacing='0'>
                                                <span>Stripe</span>
                                                <Text fontSize='8pt' color='whiteAlpha.500'>
                                                    Credit/Debit Card
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
        
        </>
    )
}

export default PaymentModal