import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Equip } from '../models/equip';

@Injectable({
  providedIn: 'root'
})

export class JugadorService {
  // currentDocument:Observable<Document> = this.socket.fromEvent<Document>('document');
  // documents:Observable<string[]> = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) { }

  afegirEquip(equip: Equip) { this.socket.emit('afegirEquip', equip);  }

  seleccionarJugador() { this.socket.emit('seleccionarJugador');  }

}
