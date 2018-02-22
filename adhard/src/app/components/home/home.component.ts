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
  precioTotalCarrito = 0;

  busquedaProcesador: string;

  constructor(public _productosService: ProductosService) {

    if (this._productosService.cargarLocalStorage() != null) {
      this.listaCarrito = this._productosService.cargarLocalStorage();
    }

    this.precioTotalCarrito = this.calcularPrecioTotal();

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
        if (this.data[i].activo) {
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
  }

  agregarCarrito(item) {
    if (item.descripcionItem !== '') {
      this.listaCarrito.push(item);
      // tslint:disable-next-line:radix
      this.precioTotalCarrito = this.precioTotalCarrito + parseInt(item.precioItem);
      this._productosService.actualizarLocalStorage(this.listaCarrito);
    }
  }

  limpiarCarrito() {
    this.listaCarrito = [];
    this.precioTotalCarrito = 0;
    this._productosService.actualizarLocalStorage(this.listaCarrito);
  }

  eliminarDelCarrito(item: Object, i: number) {
    this.listaCarrito.splice(i, 1);
    this.precioTotalCarrito = this.precioTotalCarrito - parseInt(item.precioItem);
    this._productosService.actualizarLocalStorage(this.listaCarrito);

  }


  cambiarEstado(local: Object) {
    local.activo = !local.activo;
  }

  actualizarLocalStorage() {
    this._productosService.actualizarLocalStorage(this.listaCarrito);
  }

  calcularPrecioTotal(): number {
    let total = 0;
    if (this.listaCarrito.length > 0) {
      for (let i = 0; i < this.listaCarrito.length; i++) {
        const precio = this.listaCarrito[i];
        // tslint:disable-next-line:radix
        total = total + parseInt(precio.precioItem);
      }
    }
    return total;
  }

}
