const io = require("socket.io")(5000, { cors: { origin: "*" } })
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('mensajes.db')

io.on("connection", socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on("enviar-mensaje", ({ recipientes, texto }) => {
        if(!recipientes){
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
        db.run('INSERT INTO mensajes (autor, recipientes, texto) VALUES (?, ?, ?)'
        , [id, recipientes.join(','), texto], error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Mensaje guardado en la base de datos')
            }
        })
    })
    socket.on('marcar-mensaje-como-leido', idMensaje => {
        db.run('UPDATE mensajes SET leido = 1 WHERE id = ?', idMensaje, error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Mensaje marcado como leido')
            }
        })
    })
})