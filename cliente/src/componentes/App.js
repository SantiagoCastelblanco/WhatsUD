import './App.css';
import Login from './Login'
import CuadroUsuario from './CuadroUsuario';
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import { useState } from 'react';

function App() {
  const[numUsr,setNumUsr] = useState()
  const[password,setPassword] = useState()

  return (
    <div>
      <div className='app'>
        <div className='app_body'> 
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login numberInpt={setNumUsr} pass={setPassword}/>}/>
              <Route path='/usuario' element={<CuadroUsuario numeroTelefono={numUsr} pass={password}/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
