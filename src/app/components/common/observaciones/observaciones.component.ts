import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styles: [
  ]
})
export class ObservacionesComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(){

    this.forma = this.fb.group({
      registro   : ['', [Validators.required, Validators.minLength(4)]],
      nombre     : ['', [Validators.required, Validators.minLength(4)]],
      apellido   : ['', [Validators.required, Validators.minLength(4)]],
      encargado  : ['', [Validators.required, Validators.minLength(4)]],
      area       : ['', [Validators.required, Validators.minLength(4)]],
      observacion: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  guardar(){
    console.log(this.forma);
  }

}
