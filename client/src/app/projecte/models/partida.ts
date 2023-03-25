import { Equip } from "./equip";

export class Partida {
    equips: Array<Equip>;
    constructor(equips: Array<Equip>) {
        this.equips = equips;
    }
}
