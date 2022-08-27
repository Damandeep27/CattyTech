import { Flex, Image, Text, Button, Box, Heading, VStack, Spinner, SlideFade, HStack, Tag, IconButton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BsTrashFill } from 'react-icons/bs'
import { BiPurchaseTag } from 'react-icons/bi'
import { useCore } from '../../../providers/CoreProvider'
import { useCart } from './hooks/useCart'
import PaymentModal from './PaymentModal'
import { config } from '../../../config/index'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import React from 'react'

//config.strip.publicKey
const stripePromise = loadStripe('pk_test_51L9rU2KMGpkmvkvMkeKe1RCaRPNEv1CdehWyy1shxWAIhcqPxnP1N6QjXlLuTABa35IoZ10Y4e9wCoQFhCxVOfoM00PXKy5NCd');

const CartContent = () => {
    const { cart, removeItemCart, onCheckout, isCheckingOut } = useCore();
    const { total } = useCart();

    return (
        <>
        <Flex mt="10px" justifyContent="center" wrap="wrap">
            <Elements stripe={stripePromise}>
                <PaymentModal />
            </Elements>
            <Flex maxW='8xl' w='full' flexDir='column' px="24px">
                <Text fontSize="5xl" fontWeight="extrabold" color='rgb(147, 3, 163)'>
                    Your Cart
                </Text>
                <Text fontSize="12pt" color='black'>
                    List of items you added to cart
                </Text>
                <VStack mt='2em'>
                    <HStack w='full' alignItems='flex-start'>
                        <VStack bg='rgb(255, 102, 0)' p='2em' borderRadius='10px' flex='1'>
                            <HStack spacing='2em' alignItems='flex-start' w='full'>
                                <Text fontSize='32pt'>
                                    🛒
                                </Text>
                                <VStack spacing='1em' flex='1'>
                                    {!cart ? (
                                        <Spinner />
                                    ) : (
                                        <>
                                        <Text color="white" fontWeight="bold" fontSize='16pt'>
                                            Items
                                        </Text>
                                        {cart?.map((item, idx) => (
                                            <Flex key={idx} bg='white' p='1em' borderRadius='10px' alignItems='flex-start' flexDir='column' position='relative' w='full'>
                                                <Text>
                                                    {item.name}
                                                </Text>
                                                <Text fontSize='10pt' color='orange'>
                                                    ID: {item.id}
                                                </Text>
                                                <Tag>
                                                    <Text>
                                                        ${item.price.formatted}
                                                    </Text>
                                                </Tag>
                                                <Link to=''>
                                                    <IconButton 
                                                        aria-label='Delete Item' 
                                                        position='absolute'
                                                        top='-2.5'
                                                        right='-2.5'
                                                        isRound
                                                        icon={<BsTrashFill />}
                                                        bg='whiteAlpha.800'
                                                        size='sm'
                                                        onClick={() => removeItemCart(item.id)}
                                                    />
                                                </Link>
                                            </Flex>
                                        ))}
                                        </>
                                    )}
                                </VStack>
                            </HStack>
                        </VStack>
                        <VStack p='2em' flex='1' alignItems='flex-start'>
                            <Text fontSize='32pt'>
                                Price
                            </Text>
                            <Text>
                                Product Total : ${total}
                            </Text>
                            <Flex w='full' justifyContent='flex-end'>
                                <Button 
                                _hover={{
                                    color: 'black',
                                    bg:"rgb(224, 224, 209)"
                                    
                                }} 
                                color="white" 
                                rightIcon={<BiPurchaseTag />} 
                                onClick={() => onCheckout(total)} 
                                bg='rgb(147, 3, 163)' 
                                disabled={isCheckingOut}>
                                    Checkout
                                </Button>
                            </Flex>
                        </VStack>
                    </HStack>
                </VStack>
            </Flex>
        </Flex>
        </>
    )
}

export default CartContent