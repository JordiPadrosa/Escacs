const { Jugador } = require("./Jugador");

class Equip {
  constructor(nom, jugadors) {
    this.nom = nom;
    this.jugadors = jugadors;
    this.contador = 0;
    this.contadorInvers = 2;
  }
}

module.exports = {
  Equip: Equip
};