import { Component } from '@angular/core';
import { Casella } from '../../models/casella';
import { Peca } from '../../models/peca';

@Component({
  selector: 'app-taulell',
  templateUrl: './taulell.component.html',
  styleUrls: ['./taulell.component.css']
})
export class TaulellComponent {
  taulell: Casella[][] = [];
  taulell2: Casella[][] = [];
  torn = [ 
    {id: 1, torn: 'White'},
    {id: 2, torn: 'White'}
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
  constructor() {
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
    if(IDtaulell == desti.peca.taulell) {
      if((this.torn[IDtaulell-1].torn == 'White' && origen.peca.img.includes('White'))
      || (this.torn[IDtaulell-1].torn == 'Black' && origen.peca.img.includes('Black'))){
        if((desti.peca.img.includes('Black') && origen.peca.img.includes('White'))
          || (desti.peca.img.includes('White') && origen.peca.img.includes('Black'))
          || (desti.peca.img == '')){
            if(this.torn[IDtaulell-1].torn == 'Black' && origen.peca.img.includes('Black')){
              this.torn[IDtaulell-1].torn = 'White';
              console.log(this.torn[IDtaulell-1].torn);
            }else if(this.torn[IDtaulell-1].torn == 'White' && origen.peca.img.includes('White')){
              this.torn[IDtaulell-1].torn = 'Black';
              console.log(this.torn[IDtaulell-1].torn);
            }
            if(desti.peca.taulell == 1 && desti.peca.img.includes('White')){
              this.whiteMorts1.push(desti.peca.img);
            }else if(desti.peca.taulell == 1 && desti.peca.img.includes('Black')){
              this.blackMorts1.push(desti.peca.img);
            }else if(desti.peca.taulell == 2 && desti.peca.img.includes('White')){
              this.whiteMorts2.push(desti.peca.img);
            }else if(desti.peca.taulell == 2 && desti.peca.img.includes('Black')){
              this.blackMorts2.push(desti.peca.img);
            }
            desti.peca.img = origen.peca.img;
            origen.peca.img = '';
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
