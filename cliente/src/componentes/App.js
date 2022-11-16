import './App.css';
import Login from './Login'
import CuadroUsuario from './CuadroUsuario';

import { useState } from 'react';

function App() {
  const[numUsr,setNumUsr] = useState()
  const[password,setPassword] = useState()

  return (
    <div>
      <div className='app'>
        <div className='app_body'> 
          {/**
           * Inicio de sesion
           */}
           
           <Login numberInpt = {setNumUsr} pass = {setPassword}> </Login> 
        </div>
      </div>
    </div>
  );
}

export default App;
