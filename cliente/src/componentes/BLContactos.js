import React from 'react'
import { useContactos } from '../contextos/ProveedorContactos'
import { ListGroup } from 'react-bootstrap'

export default function BLContactos() {
  const { contactos } = useContactos()
  return (
    <ListGroup variant='flush'>
      {contactos.map(contacto => (
        <ListGroup.Item key={contacto.id}>
          {contacto.nombre}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
