const io = require("socket.io")(5000)

io.on("connection", socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on("enviar-mensaje", ({ receptores, contenido }) => {
        receptores.forEach(receptor => {
            const nuevosReceptores = receptores.filter(r => r !== receptor)
            nuevosReceptores.push(id)
            socket.broadcast.to(receptor).emit("recibir-mensaje", {
                recipientes: nuevosReceptores, emisor: id, contenido
            })
        })
    })
})