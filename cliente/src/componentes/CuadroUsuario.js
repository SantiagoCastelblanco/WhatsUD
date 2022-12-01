import React from 'react'
import BarraLateral from './BarraLateral'
import Chat from './Chat'
import './CuadroUsuario.css'
import { useConversaciones } from '../contextos/ProveedorConversaciones'

function CuadroUsuario({numUsr}) {
  const {conversacionSeleccionada} = useConversaciones()
  return (
    <div className='cuadro_usuario'>
        {/*BARRA LATERAL*/}
        <BarraLateral numUsr={numUsr} />
        {/*CHAT*/}
        {conversacionSeleccionada && <Chat />}
    </div>
  )
}

export default CuadroUsuario