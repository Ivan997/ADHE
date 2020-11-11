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
  students = [
    // { name: "Claudita Alvarez Ruiz", "photo": "../../../assets/people/photos/0.jpg", id: "2031890", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Cordaro Vargas Martinez", "photo": "../../../assets/people/photos/1.jpg", id: "2031891", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Yaiza Gil Guerrero", "photo": "../../../assets/people/photos/2.jpg", id: "2031892", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Constancia Gonzalez Marin", "photo": "../../../assets/people/photos/3.jpg", id: "2031894", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Judetta Vega Moya", "photo": "../../../assets/people/photos/4.jpg", id: "2031896", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Isabel Bernal Robles", "photo": "../../../assets/people/photos/5.jpg", id: "2031899", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Lonyn Luque Sáez", "photo": "../../../assets/people/photos/6.jpg", id: "2031893", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Timo Gutierrez Bravo", "photo": "../../../assets/people/photos/7.jpg", id: "2031897", major: "Ingeniería en Desarrollo de Software" },
    // { name: "Salvatore Aguilar Castillo", "photo": "../../../assets/people/photos/9.jpg", id: "2031895", major: "Ingeniería en Desarrollo de Software" }
  ];

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

      });
      // console.log('students');
      // console.log(this.students);
    });
  }

}
