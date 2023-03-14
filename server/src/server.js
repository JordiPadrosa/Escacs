const app = require('express')();
const httpServer = require('http').Server(app);
const port=4444;

const partida = {
  equips: [
  ]
};

const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
  }
});

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado.');

  socket.on('afegirEquip', (data) => { 
      partida.equips.push({
        nom: data.nom,
        jugadors: data.jugadors,
        socket: socket,
        contador: 0
      });
      console.log(partida);
    });
    
    socket.on('seleccionarJugador', () => {
  const equipoSeleccionado = partida.equips.find((equipo) => equipo.socket === socket);

  const jugadorExistente = equipoSeleccionado.jugadors.find((jugador) => !jugador.asignado);
  let jugador;
  if (jugadorExistente) {
    jugador = jugadorExistente;
    jugador.nom = `Jugador ${equipoSeleccionado.contador + 1}`;
    jugador.asignado = true;
  } else {
    jugador = { nom: `Jugador ${equipoSeleccionado.contador + 1}`, asignado: true };
    equipoSeleccionado.jugadors.push(jugador);
  }

  // Incrementa el contador del equipo
  equipoSeleccionado.contador += 1;

  console.log(jugador);
  return jugador;
    });
  
});
