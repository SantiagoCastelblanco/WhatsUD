import React from 'react'
import BarraLateral from './BarraLateral'
import Chat from './Chat'
import './CuadroUsuario.css'

function CuadroUsuario() {
  return (
    <div className='cuadro_usuario'>
        {/*BARRA LATERAL
          
        */}
        <BarraLateral>

        </BarraLateral>

        {/*CHAT*/}
        <Chat>

        </Chat>
    </div>
  )
}

export default CuadroUsuario