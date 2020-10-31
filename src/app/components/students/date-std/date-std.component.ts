import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-std',
  templateUrl: './date-std.component.html',
  styles: [
  ]
})
export class DateStdComponent implements OnInit {


  today = new Date();
  pos = -1;

  fecha1 = new Date('12/12/2024 12:00'); // MM/DD/AAAA HH:MM:SS
  fecha2 = new Date('9/27/2020 12:00');
  fecha3 = new Date('09/24/2020 12:00');
  fecha4 = new Date('09/20/2020 12:00');

  dates = [
    {date: this.fecha1, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha2, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha4, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha3, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false},
    {date: this.fecha4, location: 'Tutorías', student: { name: 'Yaiza Gil Guerrero', photo: '../../../assets/people/photos/2.jpg', id: '2031892', major: 'Ingeniería en Desarrollo de Software' }, notes: null, finished: false}
  ];

  constructor( ) { }

  ngOnInit(): void {
    this.dates.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

    this.dates.map(citas => this.comparar(citas));
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

}
