import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useCore } from '../../../../providers/CoreProvider'
import { useUser } from '../../../../providers/UserProvider'

export const useCategory = () => {
    const { getCategoryProducts } = useCore();
    const { protectPage } = useUser();
    
    const { category } = useParams();
    
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        protectPage();

        if (!category) return;
        
        getCategoryProducts(category);
        
    }, [category])

    return {
        searchInput,
        setSearchInput,
        category
    }
}