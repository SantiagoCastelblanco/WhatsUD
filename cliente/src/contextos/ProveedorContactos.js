import React, {useContext, useEffect} from 'react'
import useLocalStorage from '../enlaces/LocalStorageManager'
import {useSocket} from './ProveedorSocket'

const ContextoContacto = React.createContext()

export function useContactos() {
  return useContext(ContextoContacto)
}


export function ProveedorContactos({id, children}) {
  const [contactos, setContactos] = useLocalStorage('contactos', [])
  const socket = useSocket()

  function guardarContactos(contactos){
    socket.emit('guardar-contactos', {contactos, numUsr:id})
  }
  function crearContacto(id, nombre) {
    setContactos(prevContactos => {
      const nuevosContactos = [...prevContactos, {id, nombre}]
      guardarContactos(nuevosContactos)
      return nuevosContactos
    })
  }

  useEffect(() => {
    if (socket == null) return
      socket.emit('obtener-contactos', id)
  }, [socket, id])
  
  useEffect(() => {
    if (socket == null) return
    socket.on('recibir-contactos', contactos => {
      setContactos(contactos)
    })
    return () => socket.off('recibir-contactos')
  }, [socket, setContactos])
  

  return (
    <ContextoContacto.Provider value={{contactos, crearContacto}}>
      {children}
    </ContextoContacto.Provider>
  )
}
