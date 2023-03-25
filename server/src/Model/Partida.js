const { Equip } = require("./Equip");

class Partida {
  constructor(equips) {
    this.equips = equips;
  }
}

module.exports = {
  Partida: Partida
};