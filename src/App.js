import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Product from './pages/[productId]'
import { Routes} from "react-router-dom";
import {Route,Link} from 'react-router-dom'
import Category from './pages/[category]';



const App = () => {
  return (
  
            <div className="App">
            
            <Routes> 
            <Route path='/'>
                <Route index element={<Home />} />
            
                <Route path='/login'>
                    <Route index element={<Login />} />
                </Route>
                <Route path='/shop'>
                    <Route index element={<Shop />} />
                </Route>
                <Route path='/category/:category'>
                    <Route index element={<Category />} />
                </Route>
                <Route path='/product/:productId'>
                    <Route index element={<Product />} />
                </Route>
                
      
            </Route>
                
              
            </Routes>

        </div>
    
  );
}

export default App;