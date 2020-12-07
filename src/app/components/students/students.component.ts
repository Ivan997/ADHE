import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  private urlFotos = 'https://raw.githubusercontent.com/Ivan997/ADHE-img/master/';
  seeProfile = false;
  students = [];
  allStudents = [];
  constructor(private router: Router, private as: AlumnosService) {
  }

  ngOnInit(): void {
    let alumnx = [];
    const promesaAlumnos = new Promise((resolve) => {
      this.as.getAlumnos('').subscribe(resp => {
        // console.log(resp);
        alumnx = resp;
        resolve();
      });
    }).then(() => {
      alumnx.forEach(index => {
        const estudiante = {
          registro: index.registro,
          nombre: index.nombre,
          foto: this.urlFotos + index.registro + '.jpg',
          carrera: index.carrera,
          grupo: index.grupo
        };

        this.students.push(estudiante);
        this.allStudents.push(estudiante);

      });
      // console.log('students');
      // console.log(this.students);
    });
  }
  Buscar(nombre){
    if(nombre == "" || nombre == null){
       this.students = this.allStudents;
    }
    else{
     this.students = this.allStudents.filter((student) =>{
       var filtered = 0;
      filtered = filtered | student.nombre.toString().toLowerCase().includes(nombre.toLowerCase());

      return filtered
      });
    }
    
  }
}
