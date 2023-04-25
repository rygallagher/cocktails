import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cocktail } from "../models/cocktail.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface QueryParam {
    key: string;
    value: string | number | boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CocktailService {
    apiKey = environment.api_ninja_api_key;
    apiUrl = 'https://api.api-ninjas.com/v1';
    path = 'cocktail';

    defaultHttpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Api-Key': this.apiKey,
        })
    };

    constructor(
        private http: HttpClient
    ) {}

    get(queryParameters: QueryParam[]): Observable<Cocktail[]> {
        let url = `${this.apiUrl}/${this.path}`;
        url = this.applyQueryParametersToURL(url, queryParameters);
        return this.http.get<Cocktail[]>(url, this.defaultHttpOptions);
    }

    private applyQueryParametersToURL(url: string, queryParameters: QueryParam[]): string {
        let stringToReturn = url;

        if (queryParameters != undefined && queryParameters.length > 0) {
            const paramsStr = queryParameters.map(queryParameter => `${queryParameter.key}=${queryParameter.value?.toString() ?? ""}`).join('&');

            if (paramsStr && paramsStr !== '') {
                stringToReturn += `?${paramsStr}`;
            }
        }

        return stringToReturn;
    }
}
