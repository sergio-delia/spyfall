import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { SpyGuessDialogComponent } from '../spy-guess-dialog/spy-guess-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class EndScreenComponent {
  gameState$ = this.gameService.gameState$;

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  playAgain() {
    this.gameService.resetGame();
  }

  playAgainWithSamePlayers() {
    this.gameService.resetGameWithSamePlayers();
  }

  openSpyGuessDialog() {

    const dialogRef = this.dialog.open(SpyGuessDialogComponent, {
      width: '400px',
      data: { }
    });

    dialogRef.afterClosed().subscribe((selectedLocation: string | undefined) => {
      if (selectedLocation !== undefined) {
        this.gameService.spyGuessLocation(selectedLocation);
      } else {
        console.log('Accusa annullata o nessun giocatore selezionato');
      }
    });
  }






}
