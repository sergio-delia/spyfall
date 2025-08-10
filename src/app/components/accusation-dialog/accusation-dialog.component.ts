import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../models/game.models';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-accusation-dialog',
  templateUrl: './accusation-dialog.component.html',
  styleUrl: './accusation-dialog.component.css',
  standalone: true,
  imports: [MatDialogModule, MatRadioModule, FormsModule, CommonModule, MatButtonModule]
})
export class AccusationDialogComponent {
  selectedPlayer: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AccusationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { players: Player[] }
  ) {}

  confirm() {
    if (this.selectedPlayer !== null) {
      this.dialogRef.close(this.selectedPlayer);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}