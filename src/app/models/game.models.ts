export interface Player {
  id: number;
  name: string;
  isSpy: boolean;
}

export interface GameState {
  players: Player[];
  currentLocation: string;
  gameStarted: boolean;
  gameEnded: boolean;
  winners: 'spies' | 'innocents' | null;
  revealingRoleToPlayer: number | null;
  timerActive: boolean;
  accusationInProgress: boolean;
  accusations: { [playerId: number]: number };
}