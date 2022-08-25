import { Flex, Image, Text, IconButton, HStack, Button, Tag, TagRightIcon, TagLabel, Menu, MenuItem, MenuList, MenuButton } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import React from 'react';
import img from '../images/logo.png';
import { useUser } from '../providers/UserProvider'
import { useCore } from '../providers/CoreProvider'
import { FaChevronDown } from 'react-icons/fa'
import { FiCopy } from 'react-icons/fi'

const Navbar = ({ isLanding=false,isHome = true }) => {
    const { isLoggedIn, Logout, email, CopyEmail } = useUser();
    const { cart} = useCore();


    return (
        <header>
            <Flex justifyContent='center' >
                <Flex 
                    px='24px'
                    py='1.5em'
                    justifyContent='space-between'
                    alignItems='flex-end'
                    maxW='8xl'
                    w='full'
                >
                    <Link to='/' >
                        
                    <HStack align="end">
                        <Image 
                            src={img} 
                            alt='Catty Tech Logo'
                            w="20%"
                        />
                        <Text fontSize='25pt' fontWeight='800' color='rgb(147, 3, 163)'>Catty Tech</Text>

                    </HStack>
                      
                    </Link>
                    <HStack alignItems='flex-end' spacing='1.5em'>
                        <HStack spacing='.5em'>
                            {isLanding && (
                                <>
                                    <Link to='#hotdeals'>
                                        <Button background='none'>
                                            Hot Deals 🔥
                                        </Button>
                                    </Link>
                                    <Link to='#features'>
                                        <Button background='none'>
                                            Features ✨
                                        </Button>
                                    </Link>
                                </>
                            )}
                            {isLoggedIn ? (
                                <HStack>
                                    <HStack>
                                        {isHome && (
                                            <Link to='/' >
                                                <Button background='none'>
                                                    Home 🏠
                                                </Button>
                                            </Link>
                                        )}
                                        {!isLanding && (
                                            <>
                                            <Link to='/shop'>
                                                <Button background='none'>
                                                    Categories 🛍️
                                                </Button>
                                            </Link>
                                            <Link to='/cart'>
                                                <Button background='none'>
                                                    My Cart &nbsp; <Tag size='sm'>{cart ? cart?.length : 0}</Tag> &nbsp;🛒
                                                </Button>
                                            </Link>
                                            </>
                                        )}
                                    </HStack>
                                    <HStack>
                                        <Tag bg='rgb(147, 3, 163,0.5)' cursor='pointer' onClick={CopyEmail}>
                                            <TagLabel>
                                                {email}
                                            </TagLabel>
                                            <TagRightIcon>
                                                <FiCopy fontSize='18pt'/>
                                            </TagRightIcon>
                                        </Tag>
                                        <Menu>
                                            <MenuButton as={Button} rightIcon={<FaChevronDown />} size='sm'>
                                                My User
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem onClick={()=>"hello"}>
                                                    Payments 💵
                                                </MenuItem>
                                                <MenuItem onClick={Logout}>
                                                    Logout ✌️
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </HStack>
                                </HStack>
                            ) : (
                           
                                <Link to='/login'>
                                    <Button background='none'>
                                        Login
                                    </Button>
                                </Link>

                            )}
                            
                           </HStack>
                    </HStack>
                </Flex>
            </Flex>
        </header>
    )
}

export default Navbar