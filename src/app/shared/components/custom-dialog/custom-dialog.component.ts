import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MatDialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message:string }
  ) {}

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}
