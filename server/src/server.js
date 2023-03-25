const { Partida } = require('./Model/Partida');
const { Equip } = require('./Model/Equip');
const { Jugador } = require('./Model/Jugador');

const app = require('express')();
const httpServer = require('http').Server(app);
const port=4444;

const partida = new Partida([]);

let partidaComencada = false;

let contador = 0;

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

    if(partidaComencada === true){
      comencarPartida(socket);
    }
    socket.on('afegirEquip', (data) => { 
      partida.equips.push(
        new Equip(data.nom, data.jugadors)
        );
    });
  
    socket.on('seleccionarJugador', () => {
      const equipSeleccionat = partida.equips[contador];
      if(equipSeleccionat){
        const jugadorExistent = equipSeleccionat.jugadors.find((jugador) => !jugador.assignat);
        let jugador = new Jugador();
        if (jugadorExistent) {
          jugador = jugadorExistent;
          jugador.assignat = true;
          if(contador == 0){
            jugador.taulell = equipSeleccionat.contadorInvers;
          }else {
            jugador.taulell = equipSeleccionat.contador+1;
          }
          if(equipSeleccionat.contador == 0){
            jugador.color = 'White';
          }else{
            jugador.color = 'Black';
          }
        }
        equipSeleccionat.contadorInvers -= 1;
        equipSeleccionat.contador += 1;
        if(equipSeleccionat.contador == equipSeleccionat.jugadors.length){
          contador = contador +1;
        }
        socket.emit('jugador', jugador);
        if(contador == 2 && equipSeleccionat.contador == 2){
          partidaComencada = true;
          comencarPartida();
        }
      }
    });
    socket.on('movimentPeca', (IDorigen , IDdesti, origen, desti, IDtaulell) => {
      let dadesTaulell = [IDorigen, IDdesti, origen, desti, IDtaulell];
      io.emit('actualitzarTaulell', dadesTaulell);
    });
});

function comencarPartida() {
  io.emit('partidaComencada', true);
  let equip1 = {
    nom: partida.equips[0].nom,
    jugadors: partida.equips[0].jugadors,
  };
  io.emit('equip1', equip1);
  
  let equip2 = {
    nom: partida.equips[1].nom,
    jugadors: partida.equips[1].jugadors,
  };
  io.emit('equip2', equip2);
}
  
