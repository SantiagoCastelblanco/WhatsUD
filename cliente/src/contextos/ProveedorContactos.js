import React, {useContext} from 'react'
import useLocalStorage from '../enlaces/LocalStorageManager'

const ContextoContacto = React.createContext()

export function useContactos() {
  return useContext(ContextoContacto)
}


export function ProveedorContactos({children}) {
  const [contactos, setContactos] = useLocalStorage('contactos', [])

  function crearContacto(id, nombre) {
    setContactos(prevContactos => {
      return [...prevContactos, {id, nombre}]
    })
  }

  return (
    <ContextoContacto.Provider value={{contactos, crearContacto}}>
      {children}
    </ContextoContacto.Provider>
  )
}
