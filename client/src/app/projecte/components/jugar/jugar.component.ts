import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JugadorService } from '../../services/jugador.service';
import { io } from 'socket.io-client'

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.css']
})
export class JugarComponent {
  jugador: string = '';
  socket: any;
  constructor(private fb: FormBuilder, private jugadorService: JugadorService) {
    this.socket = io('http://localhost:4444');
  }

  seleccionarJugador(): void {
    this.jugadorService.seleccionarJugador();
    // this.socket.emit('afegirEquip', data);
  }
}
