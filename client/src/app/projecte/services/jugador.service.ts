import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Equip } from '../models/equip';
import { Jugador } from '../models/jugador';

@Injectable({
  providedIn: 'root'
})

export class JugadorService {
  currentJugador:Observable<Jugador> = this.socket.fromEvent<Jugador>('jugador');
  partidaComencada:Observable<Boolean> = this.socket.fromEvent<Boolean>('partidaComencada');
  equip1:Observable<Equip> = this.socket.fromEvent<Equip>('equip1');
  equip2:Observable<Equip> = this.socket.fromEvent<Equip>('equip2');
  actualitzarTaulell:Observable<any> = this.socket.fromEvent<any>('actualitzarTaulell');
  
  constructor(private socket: Socket) { }

  afegirEquip(equip: Equip) { this.socket.emit('afegirEquip', equip);  }

  seleccionarJugador() { this.socket.emit('seleccionarJugador');  }

  movimentPeca(IDorigen: any, IDdesti: any, origen: any, desti: any, taulell: any) {
    this.socket.emit('movimentPeca', IDorigen, IDdesti, origen, desti, taulell);
  }
}
