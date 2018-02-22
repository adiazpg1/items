import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.css']
})
export class SelectFormComponent implements OnInit {

  @Input('lista') listaCategoria: string[];
  @Input('title') nombreCategoria: string;
  @Input('categoria') categoria:number;
  @Output() agregarCarrito: EventEmitter<any> = new EventEmitter();

  data: Object;

  resultadoBusqueda: string[] = [];
  constructor(private _productosService: ProductosService) {

   
   }

  ngOnInit() {
    this._productosService.cargarData().subscribe(
      result => {
        this.data = result;
      }, error => {
        console.log(error);
      });
  }


  busquedaEspecifica(query: string) {
    this.resultadoBusqueda = [];

    if (query === '') {
      return;
    } else if(query === 'Seleccionar todos') {

      for (let i = 0; i < Object.keys(this.data).length; i++) {
          for (let y = 0; y < this.data[i].productos[this.categoria].items.length; y++) {
            if (this.data[i].productos[this.categoria].items[y].descripcionItem) {
              this.data[i].productos[this.categoria].items[y].nombreLocal = this.data[i].nombreLocal;
              this.resultadoBusqueda.push(this.data[i].productos[this.categoria].items[y]);
            }
        }
      }

    }else {
      for (let i = 0; i < Object.keys(this.data).length; i++) {
          for (let y = 0; y < this.data[i].productos[this.categoria].items.length; y++) {
            if (this.data[i].productos[this.categoria].items[y].descripcionItem.toLowerCase().includes(query.toLowerCase())) {
              this.data[i].productos[this.categoria].items[y].nombreLocal = this.data[i].nombreLocal;
              this.resultadoBusqueda.push(this.data[i].productos[this.categoria].items[y]);
            }
          }
        
      }
    }
  }

  agregarAlCarrito(item) {
    this.agregarCarrito.emit(item);
  }

}
