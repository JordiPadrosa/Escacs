import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JugadorService } from '../../services/jugador.service';
import { io } from 'socket.io-client'
import { Observable, Subscription } from 'rxjs';
import { Jugador } from '../../models/jugador';
import { Equip } from '../../models/equip';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.css']
})
export class JugarComponent implements OnInit {
  jugador: Jugador = new Jugador("");
  partidaComencada!: Observable<Boolean>;
  socket: any;
  disable!: boolean;
  equip1!: Equip;
  equip2!: Equip;
  constructor(public jugadorService: JugadorService) {
  }

  ngOnInit(): void {
    this.jugadorService.currentJugador.subscribe(
      jugador => this.jugador = jugador
    );
    this.jugadorService.equip1.subscribe(
      equip => this.equip1 = equip
    );
    this.jugadorService.equip2.subscribe(
      equip => this.equip2 = equip
    );
    this.partidaComencada = this.jugadorService.partidaComencada;
  }

  seleccionarJugador(): void {
    this.jugadorService.seleccionarJugador();
    this.disable = true;
  }
}