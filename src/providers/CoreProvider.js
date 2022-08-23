import { useState, useEffect, useContext, createContext } from 'react'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import Commerce from '@chec/commerce.js';
import { useUser } from './UserProvider'
import { config } from '../config/index'
import { useNavigate } from 'react-router-dom'

const commerce = new Commerce('pk_4625025551459173438c4a318de69414e09c39d624909');
export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const { email } = useUser();
    const [token, setToken] = useState();
    const toast = useToast();
    const navigate=useNavigate();
    const [hotDeals, setHotDeals] = useState();
    const [products, setProducts] = useState([]);

    const addCustomer = async (email) => {
        await commerce.customer.login(email, `${config.serverUrl}/login?token=`);
    }

    const getAccessToken = async (token) => {
        await commerce.customer.getToken(token);
    }

    const customerLogout = async () => {
        await commerce.customer.logout();
    }

    useEffect(() => {
        const getProducts = async () => {
            // Get all products
            const res = await commerce.products.list();
            setProducts(res.data);

            // Get hot deals
            let tempHotDeals = [];
            for (let i = 0; i < 5; i++) {
                tempHotDeals.push(res.data[Math.floor(Math.random() * res.data.length)]);
            }
            setHotDeals(tempHotDeals);

            await getCart();
        }
        getProducts();
    }, [])

    const controllers = {
        addCustomer,
        token,
        setToken,
        customerLogout,
        products,
        hotDeals,
        getAccessToken,



    }
    return (
        <>
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
        </>
	)

    

}

