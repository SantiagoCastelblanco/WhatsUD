const io = require("socket.io")(5000, { cors: { origin: "*" } })
const sqlite3 = require('sqlite3')
const mensajesDB = new sqlite3.Database('mensajes.db')
const contactsDB = new sqlite3.Database('contacts.db')

io.on("connection", socket => {
    const id = socket.handshake.query.id
    socket.join(id)
    console.log('Usuario conectado', id)


    socket.on("enviar-mensaje", ({ recipientes, texto }) => {
        if (!recipientes) {
            console.error('No hay recipientes')
            return
        }
        recipientes.forEach(recipiente => {
            const nuevosRecipientes = recipientes.filter(r => r !== recipiente)
            nuevosRecipientes.push(id)
            console.log('Enviando mensaje a', recipiente)
            socket.broadcast.to(recipiente).emit('recibir-mensaje', {
                recipientes: nuevosRecipientes, autor: id, texto
            })
        })
        const participantes = [...recipientes, id]
        mensajesDB.all('SELECT * FROM mensajes WHERE participantes = ?', [participantes], (error, mensajes) => {
            if (error) {
                console.log(error)
            } else {
                if (mensajes.length > 0) {
                    // Update existing conversation with new message
                    const conversationId = mensajes[0].conversation_id
                    const mensaje = { autor: id, texto, fecha: new Date() }
                    const nuevosMensajes = JSON.parse(mensajes[0].mensajes)
                    nuevosMensajes.push(mensaje)
                    mensajesDB.run('UPDATE mensajes SET mensajes = ? WHERE conversation_id = ?', [JSON.stringify([nuevosMensajes]), conversationId], function (error) {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log('Mensaje añadido a conversación existente en base de datos')
                        }
                    })
                } else {
                    // Create new conversation with new message
                    const mensaje = { autor: id, texto, fecha: new Date() }
                    mensajesDB.run('INSERT INTO mensajes (participantes, mensajes) VALUES (?, ?)', [participantes, JSON.stringify([mensaje])], function (error) {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log('Mensaje y conversación nueva guardados en base de datos')
                        }
                    })
                }
            }
        })
    })
    socket.on('marcar-mensaje-como-leido', idMensaje => {

    })

    socket.on('obtener-mensajes', userID => {
        console.log('Obteniendo mensajes de ', userID)
        mensajesDB.all('SELECT * FROM mensajes WHERE participantes LIKE ?', `%${userID}%`, (error, mensajes) => {
            if (error) {
                console.log(error)
            } else {
                if (mensajes === undefined || mensajes.length == 0) return
                console.log('Mensajes enviados de base de datos a ', userID)
                socket.emit('recibir-mensajes', mensajes)
            }
        })
    })

    socket.on('guardar-contactos', ({ contactos, numUsr }) => {
        console.log('Guardando contactos de ', numUsr)
        const contactosString = JSON.stringify(contactos)
        contactsDB.run('INSERT INTO contactos (id, nombreContactos) VALUES (?, ?)', [numUsr, contactosString], error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Contactos guardados en la base de datos')
            }
        })
    })

    socket.on('obtener-contactos', numUsr => {
        console.log('Obteniendo contactos de ', numUsr)
        contactsDB.all('SELECT * FROM contactos WHERE id = ?', numUsr, (error, contactos) => {
            if (error) {
                console.log(error)
            } else {
                if (contactos === undefined || contactos.length == 0) return
                console.log('Contactos enviados de base de datos a ', numUsr)
                const contactosArray = JSON.parse(contactos[0].nombreContactos)
                socket.emit('recibir-contactos', contactosArray)
            }
        })
    })
})