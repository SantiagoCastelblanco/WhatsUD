import './App.css';
import React from 'react'
import Login from './Login'
import CuadroUsuario from './CuadroUsuario';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { ProveedorContactos } from '../contextos/ProveedorContactos';
import { ProveedorConversaciones } from '../contextos/ProveedorConversaciones';
import { useState } from 'react';
import { ProveedorSocket } from '../contextos/ProveedorSocket';

function App() {
  const[numUsr,setNumUsr] = useLocalStorage('numUsr')
  const[password,setPassword] = useLocalStorage('password')

  const cuadroUsuario = (
    <ProveedorSocket id={numUsr}>
      <ProveedorContactos>
        <ProveedorConversaciones id={numUsr}>
          <CuadroUsuario numeroTelefono={numUsr} pass={password}/>
        </ProveedorConversaciones>
      </ProveedorContactos>
    </ProveedorSocket>
  )

  return (
    <div>
      <div className='app'>
        <div className='app_body'> 
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login numberInpt={setNumUsr} pass={setPassword}/>}/>
              <Route path='/usuario' element={cuadroUsuario}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
