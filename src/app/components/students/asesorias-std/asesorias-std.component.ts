import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { ObservacionesModel } from '../../../models/observaciones.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asesorias-std',
  templateUrl: './asesorias-std.component.html',
  styles: [
  ]
})
export class AsesoriasStdComponent implements OnInit {
  forma: FormGroup;

  constructor(private as: AlumnosService, private modalService: NgbModal, private fb: FormBuilder) { }

  observaciones = false;
  clases = false;
  citasAnteriores = false;
  today = new Date();
  pos = -1;

  fecha1 = new Date('12/09/2019');//MM/DD/AAAA HH:MM:SS
  fecha2 = new Date('10/12/2019');//MM/DD/AAAA HH:MM:SS
  fecha3 = new Date('09/12/2020');//MM/DD/AAAA HH:MM:SS
  fecha4 = new Date('01/01/2020');//MM/DD/AAAA HH:MM:SS

  notas: ObservacionesModel[] = [];

  class = [
    { name: 'Matematicas', attendant: 'Ivan Arredondo', asistenciaP1: 10, partial1: 100, asistenciaP2: 10, partial2: 50, partial3: 0, asistenciaP3: 10, average: 0 },
    { name: 'Español', attendant: 'Ivan Arredondo', asistenciaP1: 10, partial1: 100, asistenciaP2: 10, partial2: 50, partial3: 20, asistenciaP3: 10, average: 0 },
    { name: 'Ingles', attendant: 'Jessica Lizette', asistenciaP1: 10, partial1: 100, asistenciaP2: 10, partial2: 50, partial3: 0, asistenciaP3: 10, average: 0 }
  ];

  ngOnInit(): void {

    let notx: ObservacionesModel[] = [];

    let observaciones = this.as.getObservaciones().subscribe(
      (notes) => {
        this.notas = notes.filter((note) => note.area == "Asesorias" && note.registro == this.as.alumnoActual);
        console.log(this.notas.length);
      }
    )

    // this.notas.sort((a, b) => {
    //   return b.fecha.getTime() - a.fecha.getTime();
    // });
  }

  getNota(index: number) {
    return this.notas[index].observacion.substring(500, -1);
  }

  muestra(index: number) {
    console.log(index, '=', this.notas[index]);
  }

  getAverage(index: number): number {
    this.class[index].average = ((this.class[index].partial1 + this.class[index].partial2 + this.class[index].partial3) / 3);

    return this.class[index].average;
  }

  open(content) {
    this.crearFormulario();
    this.modalService.open(content, { backdrop: 'static' })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  crearFormulario() {
    this.forma = this.fb.group({
      materia: ['', [Validators.required]],
      profesor: ['', [Validators.required]],
      asistencia1P: ['', [Validators.required]],
      calificacion1P: ['', [Validators.required]],
      asistencia2P: ['', [Validators.required]],
      calificacion2P: ['', [Validators.required]],
      asistencia3P: ['', [Validators.required]],
      calificacion3P: ['', [Validators.required]],
      registro: ['', [Validators.required]],
    });
    this.cargarDatos();
  }

  cargarDatos() {
    this.forma.setValue({
      materia: '',
      profesor: '',
      asistencia1P: 0,
      calificacion1P: 0,
      asistencia2P: 0,
      calificacion2P: 0,
      asistencia3P: 0,
      calificacion3P: 0,
      registro: this.as.alumnoActual
    })
  }

  get materiaValido() {
    return this.forma.get('materia').invalid && this.forma.get('materia').touched;
  }
  get profesorValido() {
    return this.forma.get('profesor').invalid && this.forma.get('profesor').touched;
  }
}


