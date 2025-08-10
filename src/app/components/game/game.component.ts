import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../../services/game.service';
import { LOCATIONS } from '../../data/locations';
import { TimerComponent } from "../timer/timer.component";
import { RoleRevealComponent } from '../role-reveal/role-reveal.component';
import { CommonModule } from '@angular/common';
import { AccusationDialogComponent } from '../accusation-dialog/accusation-dialog.component';
import { SpyGuessDialogComponent } from '../spy-guess-dialog/spy-guess-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  standalone: true,
  imports: [TimerComponent, RoleRevealComponent, CommonModule, MatButtonModule]
})
export class GameComponent {
  gameState$ = this.gameService.gameState$;
  locations = LOCATIONS;


  constructor(
    private gameService: GameService,
    private dialog: MatDialog
  ) {}

  showRole(playerId: number) {
    this.gameService.revealRoleToPlayer(playerId);
  }

  openAccusationDialog() {
    const players = this.gameService['gameState'].value.players;
    const accusations = this.gameService['gameState'].value.accusations || {};

    const dialogRef = this.dialog.open(AccusationDialogComponent, {
      width: '400px',
      data: { players, accusations }
    });

    dialogRef.afterClosed().subscribe((selectedPlayerId: number | undefined) => {
      if (selectedPlayerId !== undefined) {
        console.log('Giocatore accusato con ID:', selectedPlayerId);
        this.gameService.accusePlayer(selectedPlayerId); // <-- qui chiami la funzione
      } else {
        console.log('Accusa annullata o nessun giocatore selezionato');
      }
    });
  }







  openSpyGuessDialog() {

  }
}
