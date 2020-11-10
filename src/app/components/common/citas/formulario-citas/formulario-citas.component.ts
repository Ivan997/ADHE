import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CitasModel } from '../../../../models/citas.model';
import { AlumnosService } from '../../../../services/alumnos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario-citas',
  templateUrl: './formulario-citas.component.html',
  styles: [
  ]
})
export class FormularioCitasComponent implements OnInit {

  forma: FormGroup;

  fecha = new Date('12/21/2020');//MM/DD/AAAA HH:MM:SS

  private cita = new CitasModel();

  constructor( private fb: FormBuilder, private as: AlumnosService) {
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
    this.cita.id = '';
  }

  crearFormulario(){

    this.forma = this.fb.group({
      registro   : ['', [Validators.required, Validators.minLength(4)]],
      nombre     : ['', [Validators.required, Validators.minLength(3)]],
      apellido   : ['', [Validators.required, Validators.minLength(4)]],
      fecha      : ['', [Validators.required]],
      hora       : ['', [Validators.required]],
      encargado  : ['', [Validators.required, Validators.minLength(4)]],
      area       : ['', [Validators.required, Validators.minLength(3)]],
      nota       : ['']
    });

  }

  cargarDatos(){

    let nombreCompleto: string = this.as.student.nombre;
    let nombres = [];
    let nombre = '';
    let apellido = '';
    let reg = '';

    if (this.as !== undefined){
      try {
        nombres = nombreCompleto.split(' ');
        nombre = nombres[0];
        apellido = nombres[nombres.length - 1 ];
        reg = this.as.alumnoActual;
      } catch (error) {
        console.log(error);
      }
    }

    if(reg === ''){
      reg = '';
    }

    this.forma.setValue(
      {
        registro  : reg,
        nombre    : nombre,
        apellido  : apellido,
        encargado : '',
        fecha     : this.fecha.getDate() + '/' + this.fecha.getMonth() + '/' + this.fecha.getFullYear() ,
        hora      : '12:30',
        area      : '',
        nota      : ''
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

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando Cita',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if ( this.cita.id !== ''){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El registro ya existe'
      });
      return;
    }

    this.cita.id = '';
    this.cita.registro = form.value['registro'];
    this.cita.nombre = form.value['nombre'];
    this.cita.apellido = form.value['apellido'];
    this.cita.encargado = form.value['encargado'];
    this.cita.fecha = form.value['fecha'];
    this.cita.hora = form.value['hora'];
    this.cita.area = form.value['area'];
    this.cita.nota = form.value['nota'];
    this.cita.finalizado = false;
    this.cita.asistencia = false;


    console.log(this.cita);

    this.as.crearCita(this.cita).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Se agrego correctamente'
      });
    });

  }
}
