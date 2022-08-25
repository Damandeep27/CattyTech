import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCore } from '../../../../providers/CoreProvider'
import { useUser } from '../../../../providers/UserProvider'

export const useProduct = () => {
    const { getProduct } = useCore();
    const { protectPage } = useUser();
    const [product, setProduct] = useState();
    const { productId } = useParams();
    console.log(productId);

    useEffect(() => {
        protectPage();
        
        if (!productId) return;

        (async () => {
            
            const res = await getProduct(productId);
            
            setProduct(res);
		})()

    }, [productId])

    return {
        product,
    }
}