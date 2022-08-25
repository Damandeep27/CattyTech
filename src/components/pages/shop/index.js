import { Box, Text, Flex, Button, Wrap, WrapItem, IconButton, Tag, VStack, Image } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import { FiExternalLink } from 'react-icons/fi'
import { useShop } from './hooks/useShop'
import React from 'react'

const ShopContents = () => {
    const { categories } = useShop();
    const images =['https://cdn.chec.io/merchants/46250/assets/V6zt3seWtEj1PudZ%7C15341353.jpg']

    return ( 
       <>
        <Flex mt="10px" flexWrap="wrap" px="24px" justifyContent='center'>
            <Flex maxW='8xl' w='full' flexDir='column'>
                <Flex flexDir='column' mt='3em'>
                    <Text fontSize="5xl" fontWeight="extrabold" color='rgb(147, 3, 163)'>
                        Shop by Category
                    </Text>
                    <Wrap spacing='2em' mt='4em'>
                        {categories ? categories?.map((category, idx) => (
                            <WrapItem key={idx}>
                                <Box w='300px' bg='rgb(255, 102, 0)' borderRadius='30px' boxShadow='rgb(255,102,0) 1px 1px 1px 1px;' p='1em' position='relative'>
                                    <VStack>
                                    <Text fontWeight='bold' color="white"  isTruncated>
                                        {category.name}
                                    </Text>
                                    
                                    <Image 
                                                mb="10px"
                                                boxSize='275px'
                                                objectFit='cover'
                                                src={category.assets[0].url}
                                                alt={`category ${idx}`}
                                                fallbackSrc = 'https://via.placeholder.com/300'
                                            />
                                    </VStack>
                                   
                                
                                    <Link to={`/category/${category.name.toLowerCase()}`} >
                                        <Button w='full' mt='.5em' fontWeight='normal' fontSize='10pt' rightIcon={<FiExternalLink />}>
                                            Shop
                                        </Button>
                                    </Link>
                                   
                                </Box>
                            </WrapItem>
                        )):<Box></Box>}
                    </Wrap>
                </Flex>
            </Flex>
        </Flex>
        </>
    )
}

export default ShopContents