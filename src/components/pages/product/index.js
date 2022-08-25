import { Flex, Image, Text, Button,Box, Heading, VStack, Spinner, SlideFade } from '@chakra-ui/react'
import{Link} from 'react-router-dom'
import React from 'react'
import { useProduct } from './hooks/useProduct.js'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { FiExternalLink } from 'react-icons/fi'
import { useCore } from '../../../providers/CoreProvider'

const ProductContent = () => {
    const { AddToCart, isAddingCart } = useCore();
    const { product } = useProduct();

    return (
        <>
        <Flex mt="10px" justifyContent="center" wrap="wrap">
            {!product ? (
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='rgb(147, 3, 163)'
                    size='xl'
                />
            ) : (
                <>
                <Flex bg="rgb(255, 102, 0)" p="24px" wrap="wrap" >
                    <Image 
                        mb="10px"
                        boxSize='400px'
                        objectFit='cover'
                        src={product?.image?.url}
                        fallbackSrc = 'https://via.placeholder.com/400'
                    />        
                    <Box pl="20px" width="70%" >
                        <Heading color="white">{product?.name}</Heading>
                        <Text mt="25px" mb="20px" color="white" fontSize="2xl">Price: ${product?.price?.formatted_with_code}</Text>
                        <Text color="white" fontWeight='bold'>Overview</Text>
                        <Text color="white">${product?.description?.replaceAll('<p>', '').replaceAll('</p>', '')}</Text>
                        <Box mt="20px"> 
                        <Button rightIcon={<BsFillCartPlusFill />} size='sm' ml='.5em' onClick={() => AddToCart(product.id,product.name)} disabled={isAddingCart}>Add to cart</Button>
                        </Box>
                    </Box>
                </Flex> 
                <SlideFade in={true} offsetY='20px' delay={.45}>
                    <Flex justifyContent='space-evenly' p='2em' flexWrap='wrap'>
                        <Text fontSize="3xl" flexBasis="100%" mt='2em' mb='1em'>Related Products:</Text>
                        {product?.related_products?.map((product, idx) => (
                            <VStack key={idx} p="10px" borderRadius="10px" maxW='275px' bg='rgb(255, 102, 0)'>
                                <Image 
                                    mb="10px"
                                    boxSize='275px'
                                    objectFit='cover'
                                    src={product.image.url}
                                    fallbackSrc = 'https://via.placeholder.com/300'
                                />
                                <Text color="white" noOfLines={2}>{product.name}</Text>
                                <Text noOfLines={5} fontSize='10pt' color='whiteAlpha.700'>
                                    {product.description.replaceAll('<p>', '').replaceAll('</p>', '')}
                                </Text>
                                <Flex justifyContent='flex-end' w='full'>
                                    <Link to={`/product/${product.id}`}>
                                        <Button rightIcon={<FiExternalLink />}>
                                            Shop 
                                        </Button>
                                    </Link>
                                </Flex>
                            </VStack>
                        ))}
                    </Flex>
                </SlideFade>
                </>
            )}
        </Flex>
        </>
    )
}

export default ProductContent