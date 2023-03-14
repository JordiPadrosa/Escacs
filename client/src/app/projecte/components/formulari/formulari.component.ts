import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equip } from '../../models/equip';
import { io } from 'socket.io-client'
import { JugadorService } from '../../services/jugador.service';
@Component({
  selector: 'app-formulari',
  templateUrl: './formulari.component.html',
  styleUrls: ['./formulari.component.css']
})
export class FormulariComponent {
  criterisLocalStorage!: string | null;
  form!: FormGroup;
  equips: Array<Equip> = [];
  socket: any;
  constructor(private fb: FormBuilder, private jugadorService: JugadorService) {
    this.socket = io('http://localhost:4444');
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      nomEquip: ['',
        {
          validators: [
            Validators.required,
          ]
        }
      ],
      jugador1: ['',
        {
          validators: [
            Validators.required,
          ]
        }
      ],
      jugador2: ['',
        {
          validators: [
            Validators.required,
          ]
        }
      ],
  })
}

  afegirEquip(): void {
    let data = new Equip(this.form.get("nomEquip")?.value, [this.form.get("jugador1")?.value, this.form.get("jugador2")?.value]);
    this.jugadorService.afegirEquip(data);
  }
} 
