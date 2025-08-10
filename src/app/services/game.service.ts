import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCATIONS } from '../data/locations';
import { GameState, Player } from '../models/game.models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly INITIAL_STATE: GameState = {
    players: [],
    currentLocation: '',
    gameStarted: false,
    gameEnded: false,
    winners: null,
    revealingRoleToPlayer: null,
    timerActive: false,
    accusationInProgress: false,
    accusations: {}
  };

  private gameState = new BehaviorSubject<GameState>(this.INITIAL_STATE);
  gameState$ = this.gameState.asObservable();

    // Metodo per aggiungere un'accusa
    addAccusation(playerId: number) {
      const accusations = { ...this.gameState.value.accusations };
      accusations[playerId] = (accusations[playerId] || 0) + 1;
      this.updateGameState({ accusations });
    }

      // Metodo per ottenere chi ha più accuse
  getMostAccusedPlayer(): Player | null {
    const accusations = this.gameState.value.accusations;
    const players = this.gameState.value.players;

    if (!players.length || !accusations) return null;

    let maxCount = 0;
    let mostAccusedId: number | null = null;

    for (const [playerIdStr, count] of Object.entries(accusations)) {
      const playerId = Number(playerIdStr);
      if (count > maxCount) {
        maxCount = count;
        mostAccusedId = playerId;
      }
    }

    if (mostAccusedId === null) return null;

    return players.find(p => p.id === mostAccusedId) || null;
  }



  setPlayers(playerNames: string[]) {
    const players: Player[] = playerNames.map((name, index) => ({
      id: index,
      name,
      isSpy: false
    }));

    this.updateGameState({ players });
  }

  startGame() {
    const players = [...this.gameState.value.players];
    const spyIndex = Math.floor(Math.random() * players.length);
    players[spyIndex].isSpy = true;

    const locationIndex = Math.floor(Math.random() * LOCATIONS.length);
    const currentLocation = LOCATIONS[locationIndex];

    this.updateGameState({
      players,
      currentLocation,
      gameStarted: true,
      timerActive: true
    });
  }

  revealRoleToPlayer(playerId: number) {
    this.updateGameState({ revealingRoleToPlayer: playerId });
  }

  hideRole() {
    this.updateGameState({ revealingRoleToPlayer: null });
  }
  // Aggiorna accuse quando si accusa un giocatore
  accusePlayer(accusedPlayerId: number) {
    this.addAccusation(accusedPlayerId); // registra l'accusa
    console.log('ACCUSATO')

    // Procedi con la logica originale di fine gioco
    const accused = this.gameState.value.players.find(p => p.id === accusedPlayerId);
    if (!accused) return;

    if (accused.isSpy) {
      this.endGame('innocents');
    } else {
      this.endGame('spies');
    }
  }

  spyGuessLocation(guessedLocation: string) {
    if (guessedLocation.toLowerCase() === this.gameState.value.currentLocation.toLowerCase()) {
      this.endGame('spies');
    } else {
      this.endGame('innocents');
    }
  }

  private endGame(winners: 'spies' | 'innocents') {
    this.updateGameState({
      gameEnded: true,
      winners,
      timerActive: false
    });
  }

  resetGame() {
    this.gameState.next(this.INITIAL_STATE);
  }

  resetGameWithSamePlayers() {
    const currentPlayersNames = this.gameState.value.players.map(player => player.name);

    this.gameState.next(this.INITIAL_STATE);
    this.setPlayers(currentPlayersNames)
    this.startGame();
  }


  private updateGameState(partialState: Partial<GameState>) {
    this.gameState.next({
      ...this.gameState.value,
      ...partialState
    });
  }
}