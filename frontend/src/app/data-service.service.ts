import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  salesDay= signal('');

  constructor() { }
}
