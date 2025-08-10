import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LOCATIONS } from '../../data/locations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-spy-guess-dialog',
  templateUrl: './spy-guess-dialog.component.html',
  styleUrl: './spy-guess-dialog.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatDialogModule, FormsModule, CommonModule, MatButtonModule],

})
export class SpyGuessDialogComponent {
  locations = LOCATIONS;
  selectedLocation: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<SpyGuessDialogComponent>
  ) {}

  confirm() {
    if (this.selectedLocation) {
      this.dialogRef.close(this.selectedLocation);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}