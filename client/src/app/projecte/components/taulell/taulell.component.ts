import { Component, Input, OnInit } from '@angular/core';
import { Casella } from '../../models/casella';
import { Jugador } from '../../models/jugador';
import { Peca } from '../../models/peca';
import { JugadorService } from '../../services/jugador.service';

@Component({
  selector: 'app-taulell',
  templateUrl: './taulell.component.html',
  styleUrls: ['./taulell.component.css']
})
export class TaulellComponent implements OnInit {
  @Input() jugador!: Jugador;
  taulell: Casella[][] = [];
  taulell2: Casella[][] = [];
  torn = [ 
    {torn: 'White'},
    {torn: 'White'}
  ];


  whiteMorts1: Array<string> = [];
  whiteMorts2: Array<string> = [];
  blackMorts1: Array<string> = [];
  blackMorts2: Array<string> = [];
  lletres: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  lletres2: string[] = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  imatges: Array<string> = [
    '/assets/imatges/BlackRock.png',
    '/assets/imatges/BlackKnight.png',
    '/assets/imatges/BlackBishop.png',
    '/assets/imatges/BlackQueen.png',
    '/assets/imatges/BlackKing.png',
    '/assets/imatges/BlackBishop.png',
    '/assets/imatges/BlackKnight.png',
    '/assets/imatges/BlackRock.png',
    '/assets/imatges/WhiteRock.png',
    '/assets/imatges/WhiteKnight.png',
    '/assets/imatges/WhiteBishop.png',
    '/assets/imatges/WhiteQueen.png',
    '/assets/imatges/WhiteKing.png',
    '/assets/imatges/WhiteBishop.png',
    '/assets/imatges/WhiteKnight.png',
    '/assets/imatges/WhiteRock.png'
  ];
  columnes: Array<Peca> = [];
  acutalitzarTaulell: any = [];
  
  constructor(private jugadorService: JugadorService) {
      for (let fila = 0; fila < 8; fila++) {
      this.taulell.push([]);
      for (let columna = 0; columna < 8; columna++) {
        if(fila == 0) {
          this.taulell[fila].push(new Casella(fila, columna, new Peca(1, this.imatges[columna])));
        }else if(fila == 1) {
          this.taulell[fila][columna] = new Casella(fila, columna, new Peca(1, '/assets/imatges/BlackPawn.png'));
        }else if(fila >=2 && fila <= 5) {
          this.taulell[fila][columna] = new Casella(fila, columna, new Peca(1, ''));
        }else if(fila == 6) {
          this.taulell[fila][columna] = new Casella(fila, columna, new Peca(1, '/assets/imatges/WhitePawn.png'));
        }else if (fila == 7) {
          this.taulell[fila][columna] = new Casella(fila, columna, new Peca(1, this.imatges[columna + 8]));
        }        
      }
    }
    this.taulell2 = this.reverseBoard(this.taulell);
  }

  ngOnInit(): void {
    this.jugadorService.actualitzarTaulell.subscribe(
      taulell => {
        this.acutalitzarTaulell.push(taulell[0], taulell[1], taulell[2], taulell[3], taulell[4]);

        if(this.acutalitzarTaulell.length == 5){
          let IDorigen = this.acutalitzarTaulell[0];
          let IDdesti = this.acutalitzarTaulell[1];
          let origen = this.acutalitzarTaulell[2];
          let desti = this.acutalitzarTaulell[3];
          let IDtaulell = this.acutalitzarTaulell[4];
          if(IDtaulell == 2){
            this.canviarTorn(IDtaulell, origen);
            this.afegirCementiri(desti);
            this.taulell2[IDdesti.split("", 1)[0]][IDdesti.split("", 2)[1]].peca.img = origen.peca.img;
            this.taulell2[IDorigen.split("", 1)[0]][IDorigen.split("", 2)[1]].peca.img = '';
          }else {
            this.canviarTorn(IDtaulell, origen);
            this.afegirCementiri(desti);
            this.taulell[IDdesti.split("", 1)[0]][IDdesti.split("", 2)[1]].peca.img = origen.peca.img;
            this.taulell[IDorigen.split("", 1)[0]][IDorigen.split("", 2)[1]].peca.img = '';
          }
        }
        this.acutalitzarTaulell = [];
      }
    );
  }

  canviarTorn(IDtaulell: number, origen: Casella){
    if(this.torn[IDtaulell-1].torn == 'Black' && origen.peca.img.includes('Black')){
      this.torn[IDtaulell-1].torn = 'White';
    }else if(this.torn[IDtaulell-1].torn == 'White' && origen.peca.img.includes('White')){
      this.torn[IDtaulell-1].torn = 'Black';
    }
  }

  afegirCementiri(desti: Casella){
    if(desti.peca.taulell == 1 && desti.peca.img.includes('White')){
      this.whiteMorts1.push(desti.peca.img);
    }else if(desti.peca.taulell == 1 && desti.peca.img.includes('Black')){
      this.blackMorts1.push(desti.peca.img);
    }else if(desti.peca.taulell == 2 && desti.peca.img.includes('White')){
      this.whiteMorts2.push(desti.peca.img);
    }else if(desti.peca.taulell == 2 && desti.peca.img.includes('Black')){
      this.blackMorts2.push(desti.peca.img);
    }
  }

  reverseBoard(board: Casella[][]): Casella[][] {
    let reversedBoard: Casella[][] = [];
    for (let fila = 0; fila < 8; fila++) {
      reversedBoard.push([]);
      for (let columna = 0; columna < 8; columna++) {
        let casella = board[7 - fila][7 - columna];
        let novaCasella = new Casella(fila, columna, new Peca(2, casella.peca.img));
        reversedBoard[fila][columna] = novaCasella;
      }
    }
    return reversedBoard;
  }

  drop(event: any, taulell: Casella[][]) {
    event.preventDefault();
    let IDtaulell = event.dataTransfer.getData("name");
    let IDdesti = event.target.id;
    let IDorigen = event.dataTransfer.getData("id");
    let desti = taulell[IDdesti.split("", 1)[0]][IDdesti.split("", 2)[1]];
    let origen = taulell[IDorigen.split("", 1)[0]][IDorigen.split("", 2)[1]];
    if(IDtaulell == desti.peca.taulell && this.jugador.taulell == IDtaulell) {
      if((this.torn[IDtaulell-1].torn == 'White' && origen.peca.img.includes('White') && this.jugador.color == 'White')
      || (this.torn[IDtaulell-1].torn == 'Black' && origen.peca.img.includes('Black') && this.jugador.color == 'Black')){
        if((desti.peca.img.includes('Black') && origen.peca.img.includes('White'))
          || (desti.peca.img.includes('White') && origen.peca.img.includes('Black'))
          || (desti.peca.img == '')){
            this.jugadorService.movimentPeca(IDorigen, IDdesti, origen, desti, IDtaulell);
          }
      }
    }
    
  }

  dragStart(ev: any) {
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("name", ev.target.name);
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }
}
