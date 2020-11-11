import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import moment from 'moment';
import { AlumnosService } from 'src/app/services/alumnos.service';
moment.locale('es');
@Component({
  selector: 'app-formulario-formato',
  templateUrl: './formulario-formato.component.html',
  styleUrls: ['./formulario-formato.component.css']
})
export class FormularioFormatoComponent implements OnInit {
  forma: FormGroup;
  constructor(private fb: FormBuilder, public as: AlumnosService) { }
  fecha = moment();
  ngOnInit(): void {
    this.crearFormulario();
  }
  crearFormulario() {
    this.forma = this.fb.group({
      folio: ['', [Validators.required, Validators.minLength(4)]],
      tipo: ['', [Validators.required, Validators.minLength(3)]],
      avancesPrev: ['', [Validators.required]],
      observacionesPrev: ['', [Validators.required]],
      avances: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      registro: ['', [Validators.required]],
      encargado: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.forma.setValue({
      fecha: this.fecha.format('yyyy-mm-DD'),
      hora: this.fecha.format('hh:mm A'),
      folio: '',
      tipo: '',
      avancesPrev: '',
      observacionesPrev: '',
      avances: '',
      observaciones: '',
      encargado: '',
      registro: this.as.alumnoActual
    })
  }
  get folioValido() {
    return this.forma.get('folio').invalid && this.forma.get('folio').touched;
  }
  get tipoValido() {
    return this.forma.get('tipo').invalid && this.forma.get('tipo').touched;
  }
  get encargadoValido() {
    return this.forma.get('encargado').invalid && this.forma.get('encargado').touched;
  }
  get avancesPrevValido() {
    return this.forma.get('avancesPrev').invalid && this.forma.get('avancesPrev').touched;
  }
  get observacionesPrevValido() {
    return this.forma.get('observacionesPrev').invalid && this.forma.get('observacionesPrev').touched;
  }
  get avancesValido() {
    return this.forma.get('avances').invalid && this.forma.get('avances').touched;
  }
  get observacionesValido() {
    return this.forma.get('observaciones').invalid && this.forma.get('observaciones').touched;
  }
  save(f) {
    console.log(f);

  }
}
