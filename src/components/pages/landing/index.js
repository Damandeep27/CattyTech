import { Box, Text, Image, Flex, Heading, Button, VStack, HStack, SlideFade, Spinner, Tag } from '@chakra-ui/react'
import {UseNavigation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { useCore } from '../../../providers/CoreProvider'
import { useUser } from '../../../providers/UserProvider'
import { BsArrowRightShort } from 'react-icons/bs'
import { FiExternalLink } from 'react-icons/fi'
import { useLanding } from './hooks/useLanding'
import src1 from '../../../images/service.png'
import src2 from '../../../images/cart.png'
import home from "../../../images/h3.png"
import React from 'react'

const SiteInfoList = [
    {src: '1', heading: 'Top Customer Service ✅', subHeading: '', desc: 'Catty tech provides the best customer experience. We provide 24 hour assistance to our customers. We help our customer both before and after they buy and use our products or services which gives them  have an easy and enjoyable experience.'},
    {src: '2', heading: 'Quick Checkout 🚀', subHeading: '', desc: 'Catty Tech lets you shop with ease. All you have to do is pick a category, find a product, add to card, and checkout the product. We like to keep it simple for our customers so they can have the best shopping experience with us.'},
]

const LandingContents = () => {
    const { isLoggedIn } = useUser();
    const { hotDeals } = useCore();
    const { customerCount } = useLanding();

    return ( 
        <>
        <Flex mt="5px" flexWrap="wrap">
            <Flex justifyContent='space-between' maxW='8xl' w='full' mx='auto' px='2em' mt='7em'>
                <VStack spacing='1.5em' maxW='630px' alignItems='flex-start'>
                    <header>
                        <Text fontSize='3.75rem' lineHeight='55pt'>
                            Find your favourite tech products
                            <span style={{ color: 'rgb(147, 3, 163)' }}>
                                &nbsp;with ease
                            </span>
                        </Text>
                    </header>
                    <Text fontSize='14pt' mt='.5em' color='rgba(117, 120, 118,0.6)'>
                        We provide the best electronics to consumers at the best prices and in an efficient way.
                    </Text>
                    <HStack justifyContent='flex-start' width='full' spacing='1em'>
                        <Link to={isLoggedIn ? '/shop' : '/login'}>
                            <Button 
                                fontWeight='normal' 
                                rightIcon={<BsArrowRightShort />} 
                                size='lg' 
                                bg={isLoggedIn ? 'rgb(147, 3, 163)' : 'rgb(230, 235, 232)'}
                                _hover={{
                                    bg: isLoggedIn ? 'rgb(147, 3, 163)' : 'rgb(212, 217, 214)'
                                }}
                                textColor={isLoggedIn ? 'white': 'black'}
                            >
                                {isLoggedIn ? 'Go to Shop' : 'Get Started'}
                            </Button>
                        </Link>
                    </HStack>
                    <Text fontSize='11pt' color='rgb(106, 107, 107)'>
                        <Tag>{customerCount}</Tag> guest customers have shopped with us!
                    </Text>
                </VStack>
                <Box maxW='600px'>
                    <SlideFade in={true}  delay={.45} offsetY="20px">
                        <Image boxSize='500px' src={home} alt='Catty Tech Preview' fallbackSrc='https://via.placeholder.com/1000'/>
                    </SlideFade>
                </Box>
            </Flex>
            <Flex bg='rgb(255, 102, 0)' mt='8em' w='full' justifyContent='center'>
                <section id='hotdeals'>
                    <Flex maxW='8xl' w='full' flexDir='column'>
                        <Text fontSize="5xl" fontWeight="extrabold" color='rgb(147, 3, 163)' mt='1.25em'>
                            Hot Deals
                        </Text>
                        <Text textColor={'white'}>
                            A list of most sold items in this month
                        </Text>
                        <Flex justifyContent='space-evenly' p='2em' flexWrap='wrap'>
                            {!hotDeals ? (
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='rgb(147, 3, 163)'
                                    size='xl'
                                />
                            ) : (
                                <>
                                    {hotDeals?.map((deal, idx) => (
                                        <VStack key={idx} p="10px" borderRadius="10px" maxW='275px' mb='1em' className='feature-container'>
                                            <Image 
                                                mb="10px"
                                                boxSize='275px'
                                                objectFit='cover'
                                                src={deal.image.url}
                                                alt={`Feature ${idx}`}
                                                fallbackSrc = 'https://via.placeholder.com/300'
                                            />
                                            <Text color='white' noOfLines={2}>{deal.name}</Text>
                                            <Text noOfLines={5} fontSize='10pt' color='whiteAlpha.700'>
                                                {deal.description.substr(3, deal.description.length / 2)}...
                                            </Text>
                                            {isLoggedIn ? (
                                                <Flex justifyContent='flex-end' w='full'>
                                                    <Link to={`/product/${deal.id}`}>
                                                        <Button rightIcon={<FiExternalLink />}>
                                                            Shop 
                                                        </Button>
                                                    </Link>
                                                </Flex>
                                            ) : (
                                                <Text fontSize='10pt' color='whiteAlpha.400'>
                                                    You must be logged in to buy this product.
                                                </Text>
                                            )}
                                        </VStack>
                                    ))}
                                </>
                            )}
                        </Flex>
                    </Flex>
                </section>
            </Flex>
            <Flex w='full' justifyContent='center'>
                <section id='features'>
                    <Flex maxW='8xl' w='full' flexDir='column'>
                        {SiteInfoList.map((info, idx) => (
                            <Box display="flex" width="100%" mt="10em" p="1em" flexDirection={idx === 0 ? "row-reverse" : "row"} key={idx} bg='rgb(255, 102, 0)' borderRadius='10px'>
                                <Image 
                                    boxShadow='dark-lg' rounded='md'
                                    boxSize='300px'
                                    objectFit='cover'
                                    src={info.src == '1' ? src1: src2}
                                    bg="white"
                                    fallbackSrc = 'https://via.placeholder.com/300'
                                />
                                <VStack p="20px" m="20px" flex='1' alignItems={idx === 0 ? "flex-start" : "flex-end"}>
                                    <Heading textColor={'white'}>{info.heading}</Heading>
                                    <Text fontSize='2xl' color='whiteAlpha.800'>{info.subHeading}</Text>
                                    <Text color='whiteAlpha.800'>
                                        {info.desc} 
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </Flex>
                </section>
            </Flex>
        </Flex>
        </>
    )
}

export default LandingContents