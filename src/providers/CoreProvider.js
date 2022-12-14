import { useState, useEffect, useContext, createContext } from 'react'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import Commerce from '@chec/commerce.js';
import { useUser } from './UserProvider'
import { config } from '../config/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const commerce = new Commerce('pk_test_46250e26ead92517e9800c9a904715b822f07bd61180e');
export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)


export const CoreProvider = ({ children }) => {
    const { email } = useUser();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState();
    const [hotDeals, setHotDeals] = useState();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [categoryProductsLoading, setCategoryProductsLoading] = useState(false);
    const [token, setToken] = useState();
    const [isAddingCart, setIsAddingCart] = useState(false);
    const [paymentModalState, setPaymentModalState] = useState(false);
    const [paymentData, setPaymentData] = useState();
    const [paymentName, setPaymentName] = useState('');
    const [paymentLastName, setPaymentLastName] = useState('');
    const [paymentAddress, setPaymentAddress] = useState('');
    const [paymentCity, setPaymentCity] = useState('');
    const [paymentState, setPaymentState] = useState('');
    const [paymentZip, setPaymentZip] = useState('');
    const [paymentCountry, setPaymentCountry] = useState('');
    const [paymentEmail, setPaymentEmail] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [checkoutData, setCheckoutData] = useState();
    const [shippingCountries, setShippingCountries] = useState();
    const [shippingCountry, setShippingCountry] = useState();
    const [shippingSubdivisions, setShippingSubdivisions] = useState();
    const [shippingSubdivision, setShippingSubdivision] = useState();
    const [shippingOptions, setShippingOptions] = useState();
    const [shippingOption, setShippingOption] = useState();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState();
    const [paymentDiscount, setPaymentDiscount] = useState('');
    const [chargeId, setChargeId] = useState('');
    const [orders, setOrders] = useState();
    const [isWrongChargeId, setIsWrongChargeId] = useState(false);
    const toast = useToast();
    const navigate=useNavigate();

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

    const getCategoryProducts = async (category) => {
        setCategoryProductsLoading(true);

        const res = await commerce.products.list({
            category_slug: [category]
        });

        setCategoryProducts(res.data);
        setCategoryProductsLoading(false);
    }

    const getCategory = async () => {
        const res = await commerce.categories.list();
        return res.data;
    }

    const getProduct = async (productId) => {
        const res = await commerce.products.retrieve(productId);
        return res;
    }

    const AddToCart = async (productId,name) => {
        setIsAddingCart(true);

        await commerce.cart.add(productId, 1);

        await getCart();

        setIsAddingCart(false);

        toast({
            title: 'Success',
            description: `Successfully added "${name}" to cart`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const addCustomer = async (email) => {
        await commerce.customer.login(email, `${config.serverUrl}/login?token=`);
    }
    

    const getCart = async () => {
        const res = await commerce.cart.contents();
        setCart(res);
    }

    const removeItemCart = async (itemId) => {
        await commerce.cart.remove(itemId);
        await getCart();
    }

    const emptyCart = async () => {
        await commerce.cart.empty();
        await getCart();
    }

    const getCardId = () => {
        const res = commerce.cart.id();
        return res;
    }

    const getShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const getSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
        return Object.keys(subdivisions)[0];
    }
    
    const getShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setShippingOptions(options);
        console.log(options)
        setShippingOption(options[0].id);
    }

    const onCheckout = async (total) => {
        try {
            if (!cart.length) throw new Error("You must add item(s) to your cart");

            setIsCheckingOut(true);

            const cartId = getCardId();
        
            const checkoutDataRes = await commerce.checkout.generateToken(cartId, { type: 'cart' });
            console.log(checkoutDataRes);
            setCheckoutData(checkoutDataRes);

            await getShippingCountries(checkoutDataRes.id);
            const division = await getSubdivisions('CA');
            console.log(division);
            await getShippingOptions(checkoutDataRes.id, 'CA', division);

            setPaymentModalState(true);
            setPaymentData({
                price: total
            })

            setIsCheckingOut(false);
        }
        catch (err) {
            setIsCheckingOut(false);
            console.log(err)
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const checkoutItem = async (stripe, elements, CardElement) => {
        try {
            if (!stripe || !elements) return;

            const fieldsLength = [paymentName.length, paymentAddress.length, paymentCity.length, paymentState.length, paymentZip.length, paymentCountry.length, paymentEmail.length];
            fieldsLength.forEach((field) => {
                if (field === 0) throw new Error("Please fill in all the required fields");
            })

            if (paymentDiscount.length > 0) {
                const res = await axios.get(`${config.serverUrl}/api/payment/getCoupons`);
                
                const isValid = res.data.filter(codes => codes.id == paymentDiscount).length > 0;

                if (isValid) {
                    await commerce.checkout.checkDiscount(checkoutData.id, {
                        code: paymentDiscount,
                    });
                }
                else {
                    setPaymentDiscount('');
                    throw new Error("Invalid Discount Code");
                }
            }

            setIsPaying(true);

            const cardElement = elements.getElement(CardElement);
    
            const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    
            if (error) throw new Error(error.message);

            const orderData = {
                line_items: checkoutData.line_items,
                customer: { 
                    firstname: paymentName, 
                    lastname: paymentLastName, 
                    email: paymentEmail
                },
                shipping: { 
                    name: 'International', 
                    street: paymentAddress, 
                    town_city: paymentCity, 
                    county_state: shippingSubdivision, 
                    postal_zip_code: paymentZip, 
                    country: shippingCountry 
                },
                fulfillment: { 
                    shipping_method: shippingOption 
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                }
            };

            setPaymentMethodId(paymentMethod.id);

            const res = await commerce.checkout.capture(checkoutData.id, orderData);
            
            
            localStorage.setItem('cattytech-user', 'true');

            setIsPaying(false);
            navigate('/success')
            

            //emptyCart();
        }
        catch (err) {
            setIsPaying(false);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const goBackToCategories = () => {
        navigate('/shop')
       
    }

    const onPayments = () => {
        try {
            if (!JSON.parse(localStorage.getItem('cattytech-user'))) throw new Error('You must order something first, to access payments page.')
            if (!commerce.customer.isLoggedIn()) throw new Error('Token expired, please relogin.')

            navigate('/payments');
            
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const getOrders = async () => {
        const customerId = commerce.customer.id();
        const orders = await commerce.customer.getOrders(customerId);
        setOrders(orders.data);
    }

    const getAccessToken = async (token) => {
        await commerce.customer.getToken(token);
    }

    const refund = async () => {
        try {
            if (!chargeId.length) throw new Error('You must input a charge ID');
            if (chargeId.substring(0, 3) !== 'ch_') throw new Error('Invalid charge ID');

            const res = await axios.post(`${config.serverUrl}/api/payment/refund`, {
                chargeId
            })
    
            setChargeId('');
            setIsWrongChargeId(false);
            toast({
                title: 'Success',
                description: 'Successfully created a refund',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        catch (err) {
            setIsWrongChargeId(true);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const customerLogout = async () => {
        await commerce.customer.logout();
    }

    const controllers = {
        products,
        hotDeals,
        categoryProducts,
        getCategoryProducts,
        categoryProductsLoading,
        getCategory,
        getProduct,
        AddToCart,
        addCustomer,
        getCart,
        removeItemCart,
        emptyCart,
        getCardId,
        cart,
        isAddingCart,
        paymentModalState,
        setPaymentModalState,
        paymentData,
        setPaymentData,
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
        setIsPaying,
        setPaymentLastName,
        paymentLastName,
        checkoutData,
        shippingCountries,
        shippingCountry,
        setShippingCountry,
        shippingSubdivisions,
        shippingSubdivision,
        setShippingSubdivision,
        shippingOptions,
        shippingOption,
        setShippingOption,
        onCheckout,
        paymentEmail,
        setPaymentEmail,
        isCheckingOut,
        setIsCheckingOut,
        goBackToCategories,
        token,
        setToken,
        onPayments,
        getAccessToken,
        getOrders,
        orders,
        paymentMethodId,
        paymentDiscount,
        setPaymentDiscount,
        chargeId,
        setChargeId,
        refund,
        customerLogout,
        isWrongChargeId,
        setIsWrongChargeId
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}