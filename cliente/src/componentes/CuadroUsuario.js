import React from 'react'
import BarraLateral from './BarraLateral'
import Chat from './Chat'
import './CuadroUsuario.css'

function CuadroUsuario({numeroTelefono}) {
  return (
    <div className='cuadro_usuario'>
        {/*BARRA LATERAL
          
        */}
        <BarraLateral numeroTelefono={numeroTelefono} />

        {/*CHAT*/}
        <Chat>

        </Chat>
    </div>
  )
}

export default CuadroUsuario