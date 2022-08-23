import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes} from "react-router-dom";
import {Route,Link} from 'react-router-dom'



const App = () => {
  return (
  
            <div className="App">
            
            <Routes> 
            <Route path='/'>
                <Route index element={<Home />} />
            
                <Route path='/login'>
                    <Route index element={<Login />} />
                </Route>
                
      
            </Route>
                
              
            </Routes>

        </div>
    
  );
}

export default App;