import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversaciones } from '../contextos/ProveedorConversaciones'

export default function Chat() {
  const [texto, setTexto] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { enviarMensaje, conversacionSeleccionada } = useConversaciones()

  function manejarEntrada(e) {
    e.preventDefault()

    enviarMensaje(
      conversacionSeleccionada.recipients.map(recipient => recipient.id),
        texto
    )
    setTexto('')
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {conversacionSeleccionada.mensajes.map((mensaje, index) => {
            const ultimoMensaje = conversacionSeleccionada.mensajes.length - 1 === index
            return (
              <div ref={ultimoMensaje ?setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${mensaje.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                <div className={`rounded px-2 py-1 ${mensaje.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {mensaje.text}
                </div>
                <div className={`text-muted small ${mensaje.fromMe ? 'text-right' : ''}`}>
                  {mensaje.fromMe ? 'Tú' : mensaje.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={manejarEntrada}>
        <Form.Group className='m-2'>
        <InputGroup>
            <Form.Control
              as='textarea'
              required
              value={texto}
              onChange={e => setTexto(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button type='submit'>Enviar</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}