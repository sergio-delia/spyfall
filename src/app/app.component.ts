import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { LobbyComponent } from './components/lobby/lobby.component';
import { RoleRevealComponent } from './components/role-reveal/role-reveal.component';
import { GameComponent } from './components/game/game.component';
import { EndScreenComponent } from './components/end-screen/end-screen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LobbyComponent, RoleRevealComponent, GameComponent, EndScreenComponent, CommonModule]
})
export class AppComponent {
  gameState$ = this.gameService.gameState$;

  constructor(private gameService: GameService) {}
}
