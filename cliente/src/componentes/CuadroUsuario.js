import React from 'react'
import BarraLateral from './BarraLateral'
import Chat from './Chat'
import './CuadroUsuario.css'
import { useConversaciones } from '../contextos/ProveedorConversaciones'

function CuadroUsuario({numeroTelefono}) {
  const {conversacionSeleccionada} = useConversaciones()
  return (
    <div className='cuadro_usuario'>
        {/*BARRA LATERAL
          
        */}
        <BarraLateral numeroTelefono={numeroTelefono} />

        {/*CHAT*/}
        {conversacionSeleccionada && <Chat />}
    </div>
  )
}

export default CuadroUsuario