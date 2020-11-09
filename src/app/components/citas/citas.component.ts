import { Component, OnInit } from '@angular/core';
import { CitasModel } from '../../models/citas.model';
import { AlumnosService } from '../../services/alumnos.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
  ]
})
export class CitasComponent implements OnInit {

  citasPendientes = true;
  citasPasadas = false;

  today = new Date();
  pos = -1;

  dates = [];
  passDates = [];

  constructor( private as: AlumnosService) { }

  ngOnInit(): void {


    let citx =  [];

    let promesaCitas = new Promise((resolve) => {
      this.as.getCitas().subscribe(resp => {
        citx = resp;
        resolve();
      });
    }).then(() => {
      citx.forEach(index => {
          // console.log('Buscando en index');

          const fecha = index.fecha.split('/');
          const hora = index.hora.split(':');

          const fec = new Date(parseInt(fecha[2]), parseInt(fecha[1]), parseInt(fecha[0]), parseInt(hora[0]), parseInt(hora[1]), 0);

          const diaC = fec.getDate();
          const mesC = fec.getMonth();
          const anioC = fec.getFullYear();

          const diaH = this.today.getDate();
          const mesH = this.today.getMonth();
          const anioH = this.today.getFullYear();

          // ya paso el mes, dia o año?

          const objCita = {
            id: index.id,
            area: index.area,
            registro: index.registro,
            nombre: index.nombre + ' ' + index.apellido,
            encargado : index.encargado,
            date: fec,
            location: index.area,
            notes: index.nota,
            finished: index.finalizado,
            photo: 'https://raw.githubusercontent.com/Ivan997/ADHE-img/master/' + index.registro + '.jpg'
          };

          if ( anioC < anioH ){
            this.passDates.push(objCita);
            this.actualizarCitaPass(index);
          }
          else if ( anioC > anioH ){ this.dates.push(objCita); }
          else if ( mesC > mesH){ this.dates.push(objCita); }
          else if ( anioC === anioH && mesC === mesH  && diaC >= diaH){ this.dates.push(objCita); }
          else {
            this.passDates.push(objCita);
            if ((index.asistencia && !index.finalizado) || !index.finalizado) { this.actualizarCitaPass(index); }
          }

          this.dates.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
          });
          this.passDates.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
          });
        });

      // console.log('this.dates');
      // console.log(this.dates);
      // console.log('this.passDates');
      // console.log(this.passDates);
    });

  }


  actualizarCitaPass(cita: CitasModel): any{
    if (!cita.finalizado || cita.asistencia){
      console.log('Actualizando');
      cita.finalizado = true;
      this.as.actualizarCita(cita).subscribe();
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


}
