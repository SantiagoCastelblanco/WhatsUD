import React from 'react'
import './BarraLateral.css'

function BarraLateral() {
  return (
    <div className='barra_lateral'>

        {/* Encabezado, conteniendo informacion relacionada al usuario actual
        su numero de telefono y demas*/ }
        <div className = 'barra_lateral_encabezado'>
            <h1>Encabezado</h1>
        </div>

        {/** Encargado de la busqueda tanto de chats como de contactos*/}
        <div className='barra_lateral_busqueda'>
            <h1>busqueda</h1>
        </div>

        {/**Encargado de los botones de seleccion de contactos y chat */}
        <div className='barra_lateral_botones'>
            <h1>CHATS/CONTACTOS</h1>
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