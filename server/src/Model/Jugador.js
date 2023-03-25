class Jugador {
    constructor(nom, taulell) {
      this.nom = nom;
      this.taulell = taulell;
      this.assignat = false;
      this.color = null;
    }
  }
  
  module.exports = {
    Jugador: Jugador
  };