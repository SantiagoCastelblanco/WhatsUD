import React from 'react'
import {ListGroup} from 'react-bootstrap'
import { useConversaciones } from '../contextos/ProveedorConversaciones'

export default function BLConversaciones() {
  const {conversaciones, setConversaciones} = useConversaciones()

  return (
    <ListGroup variant='flush'>
      {conversaciones.map((conversacion, index) => (
        <ListGroup.Item key={index} action 
        onClick={() => console.log(setConversaciones)}
        active={conversacion.seleccionada}
        >
          {conversacion.recipientes.map(contacto => contacto.nombre).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
