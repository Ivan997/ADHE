import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { Router } from '@angular/router';
import { ObservacionesModel } from '../../../models/observaciones.model';

@Component({
  selector: 'app-tutorias-std',
  templateUrl: './tutorias-std.component.html',
  styles: [
  ]
})
export class TutoriasStdComponent implements OnInit {

  observaciones = false;
  citas = false;
  citasAnteriores = false;
  today = new Date();
  pos = -1;

  fecha1 = new Date('12/09/2019'); // MM/DD/AAAA HH:MM:SS
  fecha2 = new Date('09/24/2020'); // MM/DD/AAAA HH:MM:SS
  fecha3 = new Date('09/23/2020'); // MM/DD/AAAA HH:MM:SS
  fecha4 = new Date('01/01/2020'); // MM/DD/AAAA HH:MM:SS
  fecha5 = new Date('10/21/2020'); // MM/DD/AAAA HH:MM:SS

  notas: ObservacionesModel [] = [];

  dates = [
    {date: this.fecha1, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha2, location: 'GOE', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha4, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'GOE', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'Asesorias', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'Asesorias', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha2, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha5, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false}
  ];

  constructor(private as: AlumnosService, private router: Router) { }

  ngOnInit(): void {

    this.as.getObservaciones('Tutorias').subscribe(resp => {
      console.log(resp);
      this.notas = resp;
    });

    // this.notas.sort((a, b) => {
    //   return b.date.getTime() - a.date.getTime();
    // });


    // this.dates.sort((a, b) => {
    //   return a.date.getTime() - b.date.getTime();
    // });

    this.dates.map(citas => this.comparar(citas));
  }

  verificaCita(index: number){

    if (this.dates[index].location === 'Tutorías'){
      return this.dates[index].finished;
    }else{
      return true;
    }

  }

  verificaCitaVencida(index: number){
    if (this.dates[index].location === 'Tutorías' ){
      return this.dates[index].finished;
    }else{
      return false;
    }
  }

  finalizado(cita){
    this.dates.map(dat => {
      if ( dat.date.getTime() === cita.date.getTime() ){
        dat.finished = true;
      }
    });
  }

  comparar(cita): number{
    // retorna :
    // -1 si la fecha ya paso
    // 0 si es hoy
    // 1 si es en esta semana
    // 2 si pasa de la semana

    const fecha = cita.date;

    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();

    const diaH = this.today.getDate();
    const mesH = this.today.getMonth();
    const anioH = this.today.getFullYear();

    if (anio < anioH || mes < mesH){
      this.pos = -1;
      this.finalizado(cita);
      return this.pos;
    }

    // ya paso el mes, dia o año?
    if (anio > anioH || mes > mesH || dia > (diaH + 7)){
      this.pos = 2;
      return this.pos;
    }

    if (dia < diaH){
      this.pos = -1;
      this.finalizado(cita);
    }else if (dia <= (diaH + 7) && dia > diaH){
      this.pos = 1;
    }else {
      this.pos = 0;
    }

    return this.pos;
  }

  getNota(index: number){
    return this.notas[index].observacion.substring(500, -1);
  }

  muestra(index: number){
    console.log(index, '=' , this.notas[index]);
  }

  observacion(){
    console.log("navegando sin rumbo");
    this.router.navigate(['./formObserv']);
  }
}
