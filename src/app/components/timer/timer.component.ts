import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class TimerComponent implements OnInit, OnDestroy {
  private readonly GAME_DURATION = 8 * 60; // 8 minutes in seconds
  private destroy$ = new Subject<void>();

  remainingTime = this.GAME_DURATION;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.gameState$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(state => {
      if (state.timerActive) {
        this.startTimer();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startTimer() {
    interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        // Time's up - end game with innocents winning
        this.gameService.accusePlayer(-1); // Invalid ID triggers spy win
      }
    });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
