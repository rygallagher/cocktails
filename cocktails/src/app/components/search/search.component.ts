import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { CocktailService } from 'src/app/services/cocktail.service';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    separatorKeysCodes: number[] = [ENTER, COMMA];
    cocktails: Cocktail[] = [];
    ingredients: string[] = [];
    
    ingredientOptions: string[] = [
        'Whiskey',
        'Brandy',
        'Vodka',
        'Rum',
        'Gin',
        'Tequila',
        'Beer',
        'Wine',
    ];

    filteredIngredientOptions!: Observable<string[]>;

    searchForm = new FormGroup({
        searchInput: new FormControl<string | null>(null),
    });

    loading = false;

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    constructor(
        private cocktailService: CocktailService,
    ) {}

    ngOnInit() {
        this.filteredIngredientOptions = this.searchForm.controls.searchInput.valueChanges.pipe(
            startWith(''),
            map(value => {
                return value ? this._filter(value) : this.ingredientOptions.slice();
            }),
        );
    }

    loadCocktails(): void {
        this.loading = true;

        this.cocktailService.get(
            [
                { 
                    key: 'ingredients', 
                    value: this.ingredients.join(',')
                }
            ]
        ).subscribe({
            next: (cocktails: Cocktail[]) => {
                this.loading = false;
                this.cocktails = cocktails;
            }, 
            error: () => {
                this.loading = false;
                //TODO: snackbar that shows error searching for cocktails
            },
        });
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.ingredients.push(event.option.viewValue);
        this.searchInput.nativeElement.value = '';
        this.searchForm.controls.searchInput.setValue(null);
        this.loadCocktails();
    }

    addIngredient(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
    
        if (value) {
            this.ingredients.push(value);
            this.loadCocktails();
        }
    
        event.chipInput!.clear();
    
        this.searchForm.controls.searchInput.setValue(null);
    }

    removeIngredient(index: number) {
        this.ingredients.splice(index, 1);
        
        if (this.ingredients.length > 0) {
            this.loadCocktails();
        }
    }

    private _filter(name: string): string[] {
        const filterValue = name.toLowerCase();
    
        return this.ingredientOptions.filter(option => option.toLowerCase().includes(filterValue));
    }
}

