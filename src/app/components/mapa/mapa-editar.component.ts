import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css'],
})
export class MapaEditarComponent {
  forma: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.forma = formBuilder.group({
      title:data.title,
      desc: data.desc, 
    });
  }

  guardarCambios() {
    this.dialogRef.close(this.forma.value);
  
  } 
  cancelarCambios() {
    this.dialogRef.close();
  }
}
