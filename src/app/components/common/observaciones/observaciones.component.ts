import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

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
    this.cargarDatos();
  }

  ngOnInit(): void {
  }


  get registroValido(){
  return this.forma.get('registro').invalid && this.forma.get('registro').touched;
  }
  get nombreValido(){
  return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoValido(){
  return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get encargadoValido(){
  return this.forma.get('encargado').invalid && this.forma.get('encargado').touched;
  }
  get areaValido(){
  return this.forma.get('area').invalid && this.forma.get('area').touched;
  }
  get observacionValido(){
  return this.forma.get('observacion').invalid && this.forma.get('observacion').touched;
  }

  crearFormulario(){

    this.forma = this.fb.group({
      registro   : ['', [Validators.required, Validators.minLength(4)]],
      nombre     : ['', [Validators.required, Validators.minLength(4)]],
      apellido   : ['', [Validators.required, Validators.minLength(4)]],
      encargado  : ['', [Validators.required, Validators.minLength(4)]],
      area       : ['', [Validators.required, Validators.minLength(3)]],
      observacion: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  cargarDatos(){
    this.forma.setValue(
      {
        registro   : '16310034',
        nombre     : '',
        apellido   : '',
        encargado  : '',
        area       : '',
        observacion: ''
      }
    );
  }

  guardar(form: NgForm){

    if (form.invalid){

      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

   console.log(form);

  }

}
