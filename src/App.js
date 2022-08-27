import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Product from './pages/[productId]'
import Cart from './pages/Cart';
import Success from './pages/Success';
import { Routes} from "react-router-dom";
import {Route,Link} from 'react-router-dom'
import Category from './pages/[category]';
import Payment from './pages/Payment'



const App = () => {
  return (
  
            <div className="App">
           
            <Routes> 
                <Route path='/' element={<Home />} />
                
                <Route path='/login' element={<Login />} />
                
                <Route path='/shop' element={<Shop />} />
                
                <Route path='/category/:category' element={<Category />} />
            
                <Route path='/product/:productId' element={<Product />} />
            
                <Route path='/cart' element={<Cart />} />
                
                <Route path='/success' element={<Success />} />
                <Route path='/payments' element={<Payment />} />
            
              
            </Routes>
        

        </div>
    
  );
}

export default App;