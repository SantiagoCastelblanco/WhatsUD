import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContactos } from '../contextos/ProveedorContactos'
import { useConversaciones } from '../contextos/ProveedorConversaciones'

export default function NuevaConversacionModal({closeModal}) {
  const [contactoSeleccionadoID, setContactoSeleccionadoID] = useState()
  const { contactos } = useContactos()
  const { crearConversacion } = useConversaciones()

  function manejarEntrada(e) {
    e.preventDefault()

    crearConversacion(contactoSeleccionadoID)
    closeModal()
  }

  function manejarCambioEnCheckBox(id) {
    setContactoSeleccionadoID(prevContactoSeleccionadoID => {
      if (prevContactoSeleccionadoID.includes(id)) {
        return prevContactoSeleccionadoID.filter(prevId => {
          return id !== prevId
        })
      } else {
        return [...prevContactoSeleccionadoID, id]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Nueva conversacion</Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEntrada}>
          {contactos.map(contacto => (
            <Form.Group controlId={contacto.id} key={contacto.id}>
              <Form.Check
                type='checkbox'
                value={contacto.id}
                label={contacto.nombre}
                ref={contacto.id}
              />
            </Form.Group>
          ))}
          <Button type='submit'>Crear</Button>
        </Form>
      </Modal.Body>

    </>
  )
}