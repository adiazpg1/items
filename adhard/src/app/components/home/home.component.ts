import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: Object;
  busqueda: string;
  resultadoBusqueda: string[] = [];
  resultadoProcesadores: string[] = [];

  listaCarrito: string[] = [];
  precioTotalCarrito: number = 0;

  busquedaProcesador: string;

  constructor(private _productosService: ProductosService) {

    this._productosService.cargarData().subscribe(
      result => {
        this.data = result;
        console.log(result);
      }, error => {
        console.log(error);
      });


  }

  ngOnInit() {
  }

  buscar() {
    this.resultadoBusqueda = [];
    if (this.busqueda === '') {
      return;
    } else {
      for (let i = 0; i < Object.keys(this.data).length; i++) {
        for (let j = 0; j < this.data[i].productos.length; j++) {
          for (let y = 0; y < this.data[i].productos[j].items.length; y++) {
            if (this.data[i].productos[j].items[y].descripcionItem.toLowerCase().includes(this.busqueda.toLowerCase())) {
              this.data[i].productos[j].items[y].nombreLocal = this.data[i].nombreLocal;
              this.resultadoBusqueda.push(this.data[i].productos[j].items[y]);
            }
          }
        }
      }
    }
  }

  agregarCarrito(item) {
    if (item.descripcionItem != '') {
      this.listaCarrito.push(item);
      this.precioTotalCarrito = this.precioTotalCarrito + parseInt(item.precioItem);
    }
  }

  limpiarCarrito(){
    this.listaCarrito = [];
    this.precioTotalCarrito = 0;
  }

  eliminarDelCarrito(item ,i: number){
    this.listaCarrito.splice(i, 1);
    this.precioTotalCarrito = this.precioTotalCarrito  -  parseInt(item.precioItem);

  }




}
