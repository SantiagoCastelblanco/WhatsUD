import React, { useContext } from 'react'
import io from 'socket.io-client'

const ContextoSocket = React.createContext()

export function useSocket(){
    return useContext(ContextoSocket)
}

export function ProveedorSocket({ id, children }) {
    const [socket, setSocket] = React.useState()

    React.useEffect(() => {
        const newSocket = io('http://localhost:5000', { query: { id } })
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])

    return (
        <ContextoSocket.Provider value={socket}>
            {children}
        </ContextoSocket.Provider>
    )
}
