import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { crypto } from '../_models/crypto';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  result:any;

  constructor(private http:HttpClient) { }



  getPricesInit(){
    return this.http.get<crypto>('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR')
      .map(result=>this.result=result);
  }

  getPricesParam(param:string){
    return this.http.get<crypto>('https://min-api.cryptocompare.com/data/price?fsym='+param+'&tsyms=USD,JPY,EUR')
      .map(result=>this.result=result);
  }

}
