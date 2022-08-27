import { useState, useEffect, useContext, createContext } from 'react'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from './CoreProvider'
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext({})
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const { addCustomer, customerLogout } = useCore();
    const [isCustomer, setIsCustomer] = useState(false);
    const [isEmailWrong, setIsEmailWrong] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        const check = localStorage.getItem('cattytech-email');
        if (!check || !check.length) return;
        setEmail(check);
        setIsLoggedIn(true);
    }, [email])

    const LoginAsGuest = async () => {
        try {
            if (!email.length) throw new Error('Must enter an email address');
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) throw new Error('Invalid email address');

            const isUser = JSON.parse(localStorage.getItem('cattytech-user'));
            
            localStorage.setItem('cattytech-email', email);

            if (isUser) {
               
                await addCustomer(email);
                setIsCustomer(true);
                setEmail(email);
            }
            else {
                setIsCustomer(false);
                setEmail(email);
                localStorage.setItem('cattytech-user', 'false');
                setIsLoggedIn(true);

                navigate('/shop');

                

                toast({
                    title: 'Success',
                    description: `Successfully logged in as ${email}`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch (err) {
            setIsEmailWrong(true);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const protectLoginPage = () => {
        if (isLoggedIn) {
            navigate('/');
            
        }
    }

    const protectPage = () => {
       
        if (!isLoggedIn) {
            
            navigate('/login');
            //location.href = '/';
        }
    }

    const Logout = async () => {
        try {
            await customerLogout();
            localStorage.removeItem('cattytech-email');
            localStorage.removeItem('cattytech-token');
            setIsLoggedIn(false);
            navigate('/');
           
        }
        catch (err) {
            console.log(err);
        }
    }

    const CopyEmail = () => {
        navigator.clipboard.writeText(email);
        toast({
            title: 'Success',
            description: 'Copied email to clipboard',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const controllers = {
        email,
        setEmail,
        isLoggedIn,
        setIsLoggedIn,
        LoginAsGuest,
        isEmailWrong,
        protectLoginPage,
        Logout,
        CopyEmail,
        protectPage,
        isCustomer,
        setIsCustomer
    }

    return (
        <>
		<UserContext.Provider
			value={controllers}
		>
			{ children }
		</UserContext.Provider>
        </>
	)
}