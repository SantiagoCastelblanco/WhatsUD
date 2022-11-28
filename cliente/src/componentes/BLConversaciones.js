import React from 'react'
import {ListGroup} from 'react-bootstrap'
import { useConversaciones } from '../contextos/ProveedorConversaciones'

export default function BLConversaciones() {
  const {conversaciones, seleccionarConversacion} = useConversaciones()

  return (
    <ListGroup variant='flush'>
      {conversaciones.map((conversacion, index) => (
        <ListGroup.Item key={index} action onClick={() => seleccionarConversacion(index)}>
          {conversacion.recipientes.map(recipiente => recipiente).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
