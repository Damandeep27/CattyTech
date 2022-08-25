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
    const [cart, setCart] = useState();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [categoryProductsLoading, setCategoryProductsLoading] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);

    const getCategoryProducts = async (category) => {
        setCategoryProductsLoading(true);

        const res = await commerce.products.list({
            category_slug: [category]
        });
        console.log(res);

        setCategoryProducts(res.data);
        setCategoryProductsLoading(false);
    }

    const AddToCart = async (productId) => {
        setIsAddingCart(true);

        await commerce.cart.add(productId, 1);

        await getCart();

        setIsAddingCart(false);

        toast({
            title: 'Success',
            description: `Successfully added <${productId}> to cart`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }





    const addCustomer = async (email) => {
        console.log("hello");
        await commerce.customer.login(email, `${config.serverUrl}/login?token=`);
        console.log("bye");
    }

    const getCart = async () => {
        const res = await commerce.cart.contents();
        setCart(res);
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


    const getCategory = async () => {
        const res = await commerce.categories.list();
        return res.data;
    }

    const controllers = {
        addCustomer,
        token,
        setToken,
        customerLogout,
        products,
        hotDeals,
        getAccessToken,
        getCategory,
        cart,
        getCart,
        categoryProducts,
        getCategoryProducts,
        categoryProductsLoading,
        AddToCart,



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

