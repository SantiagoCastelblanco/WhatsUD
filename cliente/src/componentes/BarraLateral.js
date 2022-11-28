import React, { useState, useEffect } from 'react'
import {Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversaciones from './BLConversaciones'
import Contactos from './BLContactos'
import NuevaConversacionModal from './NuevaConversacionModal'
import NuevoContactoModal from './NuevoContactoModal'

import './BarraLateral.css'

const NOMBRE_CONVERSACIONES = 'chats'
const NOMBRE_CONTACTOS = 'contactos'

function BarraLateral({ numeroTelefono }) {
  const [entradaBusqueda, setEntradaBusqueda] = useState()
  const [menuActivo, setMenuActivo] = useState(NOMBRE_CONVERSACIONES)
  const [modalAbierto, setModalAbierto] = useState(false)
  const conversacionActiva = menuActivo === NOMBRE_CONVERSACIONES

  const manejoBusqueda = (e) => {
    setEntradaBusqueda(e.target.value)
  }
  
  function cerrarModal(){
    setModalAbierto(false)
  }

  return (
    <div className='barra_lateral'>

      {/* Encabezado, conteniendo informacion relacionada al usuario actual
        su numero de telefono y demas*/ }
      <div className='barra_lateral_encabezado'>
        <h3>Nombre de usuario</h3>
        <p>Numero de telefono: {numeroTelefono}</p>

      </div>

      {/** Encargado de la busqueda tanto de chats como de contactos*/}
      <div className='barra_lateral_busqueda'>
        <input placeholder='Ingrese contacto a buscar' value={entradaBusqueda}
          type="text"
          onChange={manejoBusqueda} />
      </div>

      {/** Contenedor de los chats y contactos*/}
      <div className='d-flex flex-column'>
        <Tab.Container activeKey={menuActivo} onSelect={setMenuActivo}>
          <Nav variant = "tabs" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey={NOMBRE_CONVERSACIONES}>Conversaciones</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={NOMBRE_CONTACTOS}>Contactos</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey={NOMBRE_CONVERSACIONES}>
              <Conversaciones />
            </Tab.Pane>
            <Tab.Pane eventKey={NOMBRE_CONTACTOS}>
              <Contactos />
            </Tab.Pane>

            <Button onClick={() => setModalAbierto(true)} className="rounded-0">
              Nuevo {conversacionActiva ? 'Chat' : 'Contacto'}
            </Button>
          </Tab.Content>
        </Tab.Container>
        <Modal show={modalAbierto} onHide={cerrarModal}>
        {conversacionActiva ? 
          <NuevaConversacionModal cerrarModal={cerrarModal} />:
          <NuevoContactoModal cerrarModal={cerrarModal} />
        }
      </Modal>
      </div>
      

    </div>
  )
}

export default BarraLateral