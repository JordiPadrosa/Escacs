import { Jugador } from "./jugador";

export class Equip {
    nom: string;
    jugadors: Array<Jugador>;
    constructor(nom: string, jugadors: Array<Jugador>) {
        this.nom = nom;
        this.jugadors = jugadors;
    }
}
