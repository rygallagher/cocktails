import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';

@Component({
    selector: 'app-cocktail-card',
    templateUrl: './cocktail-card.component.html',
    styleUrls: ['./cocktail-card.component.scss']
})
export class CocktailCardComponent {
    @Input() cocktail!: Cocktail;
    @Output() clickEvent = new EventEmitter();
}
