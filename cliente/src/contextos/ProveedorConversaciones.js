import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../enlaces/LocalStorageManager'
import { useSocket } from './ProveedorSocket'
import { useContactos } from './ProveedorContactos'

const ContextoConversaciones = React.createContext()

export function useConversaciones() {
  return useContext(ContextoConversaciones)
}

export function ProveedorConversaciones({ id, children }) {
  const [conversaciones, setConversaciones] = useLocalStorage('conversaciones', [])
  const [indexConversacionSeleccionada, setIndexConversacionSeleccionada] = useState(0)
  const { contactos } = useContactos()
  const socket = useSocket()

  function crearConversacion(recipientes) {
    setConversaciones(prevConversaciones => {
      return [...prevConversaciones, { recipientes, mensajes: [] }]
    })
  }

  const agregarMensaje = useCallback(({ recipientes, texto, autor }) => {
    setConversaciones(prevConversaciones => {
      let madeChange = false
      const mensajeNuevo = { recipientes, texto, autor }
      const conversacionNueva = prevConversaciones.map(conversacion => {
        if (igualdadArreglos(conversacion.recipientes, recipientes)) {
          madeChange = true
          return {
            ...conversacion,
            mensajes: [...conversacion.mensajes, mensajeNuevo]
          }
        }
        return conversacion
      })
      if (madeChange) {
        return conversacionNueva
      } else {
        return [...prevConversaciones, { recipientes, mensajes: [mensajeNuevo] }]
      }
    })
  }, [setConversaciones])

  useEffect(() => {
    if (socket == null) return
    socket.on('recibir-mensaje', agregarMensaje)
    return () => socket.off('recibir-mensaje')
  }, [socket, agregarMensaje])

  function enviarMensaje(recipientes, texto) {
    socket.emit('enviar-mensaje', { recipientes, texto })
    agregarMensaje({ recipientes, texto, autor: id })
  }

  const conversacionFormateada = conversaciones.map((conversacion, index) => {
    const recipientes = conversacion.recipientes.map(recipiente => {
      const contacto = contactos.find(contacto => {
        return contacto.id === recipiente
      })
      const nombre = (contacto && contacto.nombre) || recipiente
      return { id: recipiente, nombre }
    })
    const mensajes = conversacion.mensajes.map(mensaje => {
      const contacto = contactos.find(contacto => {
        return contacto.id === mensaje.autor
      })
      const nombre = (contacto && contacto.nombre) || mensaje.autor
      const fromMe = id === mensaje.autor
      return { ...mensaje, nombre, fromMe }
    })
    const selected = index === indexConversacionSeleccionada
    return { ...conversacion, recipientes, mensajes, selected }
  })

  const valor = {
    conversaciones: conversacionFormateada,
    conversacionSeleccionada: conversacionFormateada[indexConversacionSeleccionada],
    enviarMensaje,
    seleccionarConversacionIndex: setIndexConversacionSeleccionada,
    crearConversacion
  }

  return (
    <ContextoConversaciones.Provider value={valor}>
      {children}
    </ContextoConversaciones.Provider>
  )
}

function igualdadArreglos(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}
