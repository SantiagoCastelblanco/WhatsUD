import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../enlaces/LocalStorageManager'
import { useSocket, marcarMensajeComoLeido } from './ProveedorSocket'
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
      let hayCambio = false
      const mensajeNuevo = { autor, texto, leidoPor: [autor] }
      const conversacionNueva = prevConversaciones.map(conversacion => {
        if (igualdadArreglos(conversacion.recipientes, recipientes)) {
          hayCambio = true
          return {

            ...conversacion,
            mensajes: [...conversacion.mensajes, mensajeNuevo]
          }
        }
        return conversacion
      })
      if (hayCambio) {
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

  useEffect(() => {
    if(socket == null) return
    console.log('recibiendo mensajes')
    socket.on('recibir-mensajes',(mensajes )=> {
      const conversacionesNuevas = []
      let conversacionesLlegada = JSON.parse(mensajes)
      conversacionesLlegada.forEach(conversacion => {
        console.log(conversacion)
        const recipientes  = conversacion.recipientes
        let mensajesConversacion = JSON.parse(conversacion.mensajes)  
        mensajesConversacion.forEach(mensaje => {
          const indexConversacionExistente = conversacionesNuevas.findIndex(conversacion => {
            return igualdadArreglos(conversacion.recipientes, recipientes)
          })
          if(indexConversacionExistente>=0){
            conversacionesNuevas[indexConversacionExistente].mensajes.push({autor:mensaje.autor, texto:mensaje.texto, fecha:mensaje.fecha})
          }else{
            conversacionesNuevas.push({recipientes, mensajes:[{autor:mensaje.autor, texto:mensaje.texto, fecha:mensaje.fecha}]})
          }
        })
      })
      setConversaciones(conversacionesNuevas)
    })
  }, [socket, setConversaciones])


  useEffect(() => {
    if (socket) {
      console.log('obteniendo mensajes')
      socket.emit('obtener-mensajes', id)
    }
  }, [socket])


  function enviarMensaje(recipientes, texto) {
    socket.emit('enviar-mensaje', {recipientes, texto })
    agregarMensaje({ recipientes, texto, autor: id })
  }

  function marcarMensajeComoLeido(idMensaje) {
    setConversaciones(prevConversaciones => {
      return prevConversaciones.map(conversacion => {
        return {
          ...conversacion,
          mensajes: conversacion.mensajes.map(mensaje => {
            if (mensaje.id === idMensaje) {
              return { ...mensaje, leidoPor: [...mensaje.leidoPor, id.numUsr] }
            }
            return mensaje
          })
        }
      })
    })
    socket.emit('marcar-mensaje-como-leido', idMensaje)
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
      const mensajeUsuario = id === mensaje.autor
      return { ...mensaje, nombreAutor: nombre, mensajeUsuario }
    })
    const seleccionado = index === indexConversacionSeleccionada
    return { ...conversacion, mensajes, recipientes, seleccionado }
  })

  const valor = {
    conversaciones: conversacionFormateada,
    conversacionSeleccionada: conversacionFormateada[indexConversacionSeleccionada],
    enviarMensaje,
    seleccionarIndexConversacion: setIndexConversacionSeleccionada,
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
