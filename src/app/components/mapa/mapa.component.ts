import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../clases/marcador';
import { MapaEditarComponent } from './mapa-editar.component';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  marcadores: Marcador[] = [];
  lat = -16.383849;
  lng = -71.508403;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores')!);
      if (this.marcadores.length > 0) {
        this.lat = this.marcadores[0].lat;
        this.lng = this.marcadores[0].lng;
      }
    }
  }

  ngOnInit(): void {}
  agregarMarcador(e: any) {
    const coords: { lat: number; lng: number } = e.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 1500 });
    this.marcadores.push(nuevoMarcador);
    this.guardarMarcadoresStorage();
  }
  guardarMarcadoresStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 1500 });
    this.guardarMarcadoresStorage();
  }
  editarDescripcion(marcador: Marcador) {
    // this.marcadores[i].desc = prompt('Ingrese la nueva descripcion')!;
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { title: marcador.title, desc: marcador.desc },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (!result) {
        return;
      }
      marcador.title = result.title == '' ? 'Sin titulo' : result.title;
      marcador.desc = result.desc == '' ? 'Sin descripcion' : result.desc;
      this.guardarMarcadoresStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 1500 });
    });
  }
 
}
