import { Component, OnInit } from '@angular/core';
import { crypto } from '../_models/crypto';
import { CurrencyService } from '../_services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  objectKeys=Object.keys;
  cryptos:crypto;
  name:string='';
  current:string='Bitcoin';


  cryptoList=[
    {id:'BTC',name:'Bitcoin'},
    {id:'ETH',name:'Etherium'},
    {id:'DOGE',name:'Doge coin'},
    {id:'LTC',name:'Litecoin'}
  ];

  constructor(private currency:CurrencyService) { }

  ngOnInit(): void {
    //  this.currency.getPricesInit().subscribe(res=>{
    //    this.cryptos=res;
    //  })
  }

  optionChange(e){
      const found=this.cryptoList.find(el=>el===e.target.value);
      console.log();
      this.currency.getPricesParam(e.target.value).subscribe(res=>{
        this.cryptos=res;
      })
  }

}
