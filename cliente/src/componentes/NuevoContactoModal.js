import React, {useRef} from 'react'
import { useContactos } from '../contextos/ProveedorContactos'
import { Form, Modal,Button } from 'react-bootstrap'


export default function NuevoContactoModal({closeModal}) {
  const nombreRef = useRef()
  const numRef = useRef()
  const {crearContacto} = useContactos()

  function manejarEntrada(e) {
    e.preventDefault()
    console.log(nombreRef.current.value)
    console.log(numRef.current.value)
    crearContacto(numRef.current.value, nombreRef.current.value)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Crear nuevo contacto</Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEntrada}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text' ref={nombreRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Numero de telefono</Form.Label>
            <Form.Control type='number' ref={numRef} required />
          </Form.Group>
          <Button type='submit'>Crear</Button>
        </Form>
      </Modal.Body>

    </>
  )
}
