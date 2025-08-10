import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lobby',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, CommonModule, MatInputModule, MatButtonModule],
  standalone: true,
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  readonly MIN_PLAYERS = 3;
  readonly MAX_PLAYERS = 8;

  lobbyForm: FormGroup;

  constructor(private fb: FormBuilder, private gameService: GameService) {
    this.lobbyForm = this.fb.group({
      players: this.fb.array([])
    });

    // Initialize with 3 player fields
    for (let i = 0; i < this.MIN_PLAYERS; i++) {
      this.addPlayer();
    }
  }

  get players() {
    return this.lobbyForm.get('players') as FormArray;
  }

  addPlayer() {
    if (this.players.length < this.MAX_PLAYERS) {
      this.players.push(this.fb.control('', Validators.required));
    }
  }

  removePlayer(index: number) {
    if (this.players.length > this.MIN_PLAYERS) {
      this.players.removeAt(index);
    }
  }

  startGame() {
    if (this.lobbyForm.valid) {
      const playerNames = this.players.value;
      this.gameService.setPlayers(playerNames);
      this.gameService.startGame();
    }
  }
}
