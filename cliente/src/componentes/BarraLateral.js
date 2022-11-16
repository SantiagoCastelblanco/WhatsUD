import React, { useState, useEffect } from 'react'
import './BarraLateral.css'


function BarraLateral({ numeroTelefono }) {
  const [entradaBusqueda, setEntradaBusqueda] = useState()
  const [contactos, setContactos] = useState([])
  const [contactosFiltrados, setContactosFiltrados] = useState([])
  const [contactoSeleccionado, setContactoSeleccionado] = useState()

  const manejoBusqueda = (e) => {
    setEntradaBusqueda(e.target.value)
  }

  const types = ["Conversacionjes", "Contactos"]

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

      {/**Encargado de los botones de seleccion de contactos y chat */}
      <div className='barra_lateral_botones'>
      </div>

      {/**Encargado de mantener todos los chats organizados */}
      <div className='barra_lateral_chats'>

      </div>

      {/**Encargado de mantenenr los contactos organizados */}
      <div className='barra_lateral_contactos'>

      </div>

    </div>
  )
}

export default BarraLateral