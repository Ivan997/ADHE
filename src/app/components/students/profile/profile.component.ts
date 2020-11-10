import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../../services/alumnos.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registroActual = '';
  urlPhoto = 'https://raw.githubusercontent.com/Ivan997/ADHE-img/master/';
  student = {
    carrera: '',
    grupo: '',
    nivel: '',
    nombre: '',
    registro: '',
    tipo: '',
    turno: '',
    foto: ''
  };
  isTimetableVisible = false;
  areSubjectsVisible = false;

  constructor(private as: AlumnosService) {
    this.registroActual = as.alumnoActual;
    // console.log(this.registroActual);
  }

  ngOnInit() {

    let alumnxs;

    const promesaAlumno = new Promise((resolve) => {
      this.as.getAlumnos(this.registroActual).subscribe((resp) => {
        // console.log('resp', resp);
        alumnxs = resp;
        resolve();
      });
    }).then(() => {
      this.student.nombre = alumnxs.nombre;
      this.student.carrera = alumnxs.carrera;
      this.student.grupo = alumnxs.grupo;
      this.student.nivel = alumnxs.nivel;
      this.student.registro = alumnxs.registro;
      this.student.tipo = alumnxs.tipo;
      this.student.turno = alumnxs.turno;
      this.student.foto = this.urlPhoto + alumnxs.registro + '.jpg';
    });

    this.as.student = this.student;

  }

}
