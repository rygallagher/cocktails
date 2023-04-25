import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cocktail } from 'src/app/models/cocktail.model';

interface DialogData {
    cocktail: Cocktail
}

@Component({
    selector: 'app-cocktail-dialog',
    templateUrl: './cocktail-dialog.component.html',
    styleUrls: ['./cocktail-dialog.component.scss']
})
export class CocktailDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CocktailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    close(): void {
        this.dialogRef.close();
    }
}
