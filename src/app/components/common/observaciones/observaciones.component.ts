import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AlumnosService } from '../../../services/alumnos.service';
import Swal from 'sweetalert2';
import { ObservacionesModel } from '../../../models/observaciones.model';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styles: [
  ]
})
export class ObservacionesComponent implements OnInit {

  constructor(private fb: FormBuilder, private as: AlumnosService) {
    this.crearFormulario();
    this.cargarDatos();
  }


  get registroValido() {
    return this.forma.get('registro').invalid && this.forma.get('registro').touched;
  }
  get nombreValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get encargadoValido() {
    return this.forma.get('encargado').invalid && this.forma.get('encargado').touched;
  }
  get areaValido() {
    return this.forma.get('area').invalid && this.forma.get('area').touched;
  }
  get observacionValido() {
    return this.forma.get('observacion').invalid && this.forma.get('observacion').touched;
  }

  forma: FormGroup;

  valor = new ObservacionesModel();

  ngOnInit(): void {
    this.valor.id = '';
  }

  crearFormulario() {

    this.forma = this.fb.group({
      registro: ['', [Validators.required, Validators.minLength(4)]],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      encargado: ['', [Validators.required, Validators.minLength(4)]],
      area: ['', [Validators.required, Validators.minLength(3)]],
      observacion: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  cargarDatos() {

    let nombreCompleto: string = this.as.student.nombre;
    let nombres = [];
    let nombre = '';
    let apellido = '';
    let reg = '';

    if (this.as !== undefined) {
      try {
        nombres = nombreCompleto.split(' ');
        nombre = nombres[0];
        apellido = nombres[nombres.length - 1];
        reg = this.as.alumnoActual;
      } catch (error) {
        console.log(error);
      }
    }

    if (reg === '') {
      reg = '';
    }

    this.forma.setValue(
      {
        registro: reg,
        nombre,
        apellido,
        encargado: '',
        area: '',
        observacion: ''
      }
    );
  }

  guardar(form: NgForm) {

    if (form.invalid) {

      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando Observación',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if (this.valor.id !== '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El registro ya existe'
      });
      return;
    }

    const today = new Date();
    let mes = '';

    switch (today.getMonth()) {
      case 1:
        mes = 'Enero';
        break;
      case 2:
        mes = 'Febrero';
        break;
      case 3:
        mes = 'Marzo';
        break;
      case 4:
        mes = 'Abril';
        break;
      case 5:
        mes = 'Mayo';
        break;
      case 6:
        mes = 'Junio';
        break;
      case 7:
        mes = 'Julio';
        break;
      case 8:
        mes = 'Agosto';
        break;
      case 9:
        mes = 'Septiembre';
        break;
      case 10:
        mes = 'Octubre';
        break;
      case 11:
        mes = 'Noviembre';
        break;
      case 12:
        mes = 'Diciembre';
        break;
    }

    this.valor = {
      id: '',
      registro: form.value['registro'],
      nombre: (form.value['nombre'] + ' ' + form.value['apellido']),
      encargado: form.value['encargado'],
      observacion: form.value['observacion'],
      area: form.value['area'],
      fecha: `${today.getDate()} ${mes} ${today.getFullYear()}`,
      hora: `${today.getHours()}:${today.getMinutes()}.${today.getSeconds()}`
    };

    this.as.crearObservacion(this.valor).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: 'Se agrego correctamente'
      });
    });

  }

}
