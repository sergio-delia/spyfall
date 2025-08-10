import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-role-reveal',
  templateUrl: './role-reveal.component.html',
  styleUrls: ['./role-reveal.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class RoleRevealComponent {
  gameState$ = this.gameService.gameState$;

  currentPlayer$ = this.gameState$.pipe(
    map(state => state.players.find(p => p.id === state.revealingRoleToPlayer))
  );

  constructor(private gameService: GameService) {}

  hideRole() {
    this.gameService.hideRole();
  }
}
