import './App.css';
import React,{ useState } from 'react'
import Login from './Login'
import CuadroUsuario from './CuadroUsuario';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { ProveedorContactos } from '../contextos/ProveedorContactos';
import { ProveedorConversaciones } from '../contextos/ProveedorConversaciones';
import { ProveedorSocket } from '../contextos/ProveedorSocket';
import useLocalStorage from '../enlaces/LocalStorageManager'

function App() {
  const[numUsr,setNumUsr] = useLocalStorage('numUsr')
  const[password,setPassword] = useState('')

  const cuadroUsuario = (
    <ProveedorSocket id={numUsr}>
      <ProveedorContactos id = {numUsr}>
        <ProveedorConversaciones id={numUsr}>
          <CuadroUsuario numUsr={numUsr} pass={password} />
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
              <Route path='/usuario' element={cuadroUsuario} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
