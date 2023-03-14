import { Peca } from "./peca";

export class Casella {
    fila!: number;
    columna!: number;
    peca!: Peca;
    constructor(fila: number, columna: number, peca: Peca) {
        this.fila = fila;
        this.columna = columna;
        this.peca = peca;
    }
}
