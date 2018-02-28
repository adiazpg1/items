import { Component, OnInit } from '@angular/core';
import { ApiService, Cat } from '../../services/api.service';
import { Producto } from '../../clases/productos';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  apiJson: Object;
  catResult: string;
  nombreGatito: string;
  productos: any;

  constructor(private _apiService: ApiService) {

    this._apiService.getAllCats().subscribe((param) => {
      console.log(param);
      this.apiJson = param;
    })

    this._apiService.getItemsProductos().subscribe(param => {
      this.productos = param;
    });

  }

  ngOnInit() {
  }

  buscarGato() {
    this._apiService.getCat(this.nombreGatito).subscribe(param => {
      this.catResult = param.name;
    })
  }

  crearGato() {
    var gatito: Cat =
      {
        name: this.nombreGatito
      }

    this._apiService.insertCat(gatito).subscribe(params => {
      console.log(params);
    });
  }

}
