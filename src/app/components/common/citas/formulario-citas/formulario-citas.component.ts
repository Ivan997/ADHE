import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-formulario-citas',
  templateUrl: './formulario-citas.component.html',
  styles: [
  ]
})
export class FormularioCitasComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDatos();
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
  get fechaValido(){
  return this.forma.get('fecha').invalid && this.forma.get('fecha').touched;
  }
  get horaValido(){
  return this.forma.get('hora').invalid && this.forma.get('hora').touched;
  }
  get areaValido(){
  return this.forma.get('area').invalid && this.forma.get('area').touched;
  }

  ngOnInit(): void {
  }

  crearFormulario(){

    this.forma = this.fb.group({
      registro   : ['', [Validators.required, Validators.minLength(4)]],
      nombre     : ['', [Validators.required, Validators.minLength(3)]],
      apellido   : ['', [Validators.required, Validators.minLength(4)]],
      fecha      : ['', [Validators.required]],
      hora      : ['', [Validators.required]],
      encargado  : ['', [Validators.required, Validators.minLength(4)]],
      area       : ['', [Validators.required, Validators.minLength(3)]],
      nota      : ['', [Validators.required]],
    });

  }

  cargarDatos(){
    this.forma.setValue(
      {
        registro  : '16310034',
        nombre    : '',
        apellido  : 'Arredondo Martinez',
        encargado : '',
        fecha     : '',
        hora      : '',
        area      : '',
        nota      : ''
      }
    );
  }

  guardar(form: NgForm){

    if(form.invalid){

      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

   console.log(form);

  }
}
