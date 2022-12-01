import React from 'react'
import {ListGroup} from 'react-bootstrap'
import { useConversaciones } from '../contextos/ProveedorConversaciones'

export default function BLConversaciones() {
  const {conversaciones, seleccionarIndexConversacion} = useConversaciones()

  return (
    <ListGroup variant='flush'>
      {conversaciones.map((conversacion, index) => (
        <ListGroup.Item key={index}
        action 
        onClick={() => seleccionarIndexConversacion(index)}
        active={conversacion.seleccionado}
        >
          {conversacion.recipientes.map(contacto => contacto.nombre).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
