import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DadataConfig} from '../components/dadata/dadata-config';
import {environment} from '../../environments/environment';
import {DadataSuggestion} from '../interfaces/DadataSuggestion';
import {DadataResponse} from '../interfaces/DadataResponse';
import {DadataLocation} from '../interfaces/DadataLocation';

@Injectable({
  providedIn: 'root'
})
export class DadataService {

  constructor(
    private readonly http: HttpClient
  )
  {}

  getSuggestion(query: string, config: DadataConfig): Observable<DadataResponse> {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + environment.dadataToken,
      })
    };
    const body = Object.assign(
      {},
      {query: query},
      {count: config?.limit},
      {locations: config?.locations},
      {restrict_value: true},
      {from_bound: config?.bounds?.fromBound},
      {to_bound: config?.bounds?.toBound}
    )
    return this.http.post<DadataResponse>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/' + config.type, body, options);
  }

}
