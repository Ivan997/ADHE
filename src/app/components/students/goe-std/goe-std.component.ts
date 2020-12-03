import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { ObservacionesModel } from '../../../models/observaciones.model';
import { CitasModel } from '../../../models/citas.model';
import * as moment from 'moment';
import { ObservacionesGOEModel } from '../../../models/observacionesgoe.model';
moment.locale('es');

@Component({
  selector: 'app-goe-std',
  templateUrl: './goe-std.component.html',
  styles: [
  ]
})
export class GoeStdComponent implements OnInit {


  public lineaChartData: Array<any> = [
    {data: [65, 59, 80], label: 'Series aksdu'},
    {data: [28, 48, 40], label: 'Series adska'}
  ];
  private lineaChartLabels: Array<any> = ['Asistencia','Inasistencia'];

  observaciones = false;
  citas = false;
  graficas = false;
  vacio = false;
  citasAnteriores = false;
  today = new Date();
  pos = -1;

  asistencia = 0;
  inasistencia = 0;

  notas: ObservacionesGOEModel[] = [];

  dates = [];
  passDates = [];

  constructor(private as: AlumnosService) { }


  ngOnInit(): void {

    let citx = [];
    let notx: ObservacionesModel[] = [];

    let observaciones = this.as.getObservaciones().subscribe(
      (notes) => {
        this.notas = notes.filter((note) => note.area == "GOE" && note.registro == this.as.alumnoActual);
        console.log(this.notas.length);
      }
    )

    let promesaCitas = new Promise((resolve) => {
      this.as.getCitas().subscribe(resp => {
        citx = resp;
        resolve();
      });
    }).then(() => {
      citx.forEach(index => {

        if (index.registro === this.as.alumnoActual) {
          // console.log('Buscando en index');

          const fecha = index.fecha.split('/');
          const hora = index.hora.split(':');

          console.log('fecha');
          console.log(fecha);
          const fec = new Date((parseInt(fecha[2])), (parseInt(fecha[1])-1), parseInt(fecha[0]), parseInt(hora[0]), parseInt(hora[1]), 0);

          const diaC = fec.getDate();
          const mesC = fec.getMonth();
          const anioC = fec.getFullYear();

          const diaH = this.today.getDate();
          const mesH = this.today.getMonth();
          const anioH = this.today.getFullYear();

          const objCita = {
            id: index.id,
            area: index.area,
            registro: index.registro,
            nombre: index.nombre + ' ' + index.apellido,
            encargado: index.encargado,
            date: fec,
            location: index.area,
            notes: index.nota,
            finished: index.finalizado,
            asistencia: index.asistencia,
            photo: 'https://raw.githubusercontent.com/Ivan997/ADHE-img/master/' + this.as.alumnoActual + '.jpg'
          };

          if (anioC < anioH) {
            this.passDates.push(objCita);
            this.actualizarCitaPass(index);
          }
          else if (anioC > anioH) { this.dates.push(objCita); }
          else if (mesC > mesH) { this.dates.push(objCita); }
          else if (anioC === anioH && mesC === mesH && diaC >= diaH) { this.dates.push(objCita); }
          else {
            if(objCita.area==='GOE'){
              if (objCita.asistencia){
                this.asistencia++;
              }else{
                this.inasistencia++;
              }
            }
            this.passDates.push(objCita);
            if ((index.asistencia && !index.finalizado) || !index.finalizado) { this.actualizarCitaPass(index); }
          }

          this.dates.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
          });
          this.passDates.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
          });
        }

      });

      this.lineaChartData = [
        {data: [this.asistencia, this.inasistencia], label: 'Citas'}
      ];
      if (this.asistencia !== 0 && this.inasistencia !== 0 ){
        this.graficas = true;
        this.vacio = false;
      }else{
        this.graficas = false;
        this.vacio = true;
      }


    });
  }

  formatearFecha(fecha) {
    return moment(fecha).format("dddd, DD MMMM YYYY hh:mm A");
  }
  actualizarCitaPass(cita: CitasModel): any {
    if (!cita.finalizado || cita.asistencia) {
      console.log('Actualizando');
      cita.finalizado = true;
      this.as.actualizarCita(cita).subscribe();
    }
  }

  verificaCita(index: number) {

    if (this.dates[index].location === 'GOE') {
      return this.dates[index].finished;
    } else {
      return true;
    }

  }

  finalizado(cita) {
    this.dates.map(dat => {
      if (dat.date.getTime() === cita.date.getTime()) {
        dat.finished = true;
      }
    });
  }

  comparar(cita): number {
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

    if (anio < anioH || mes < mesH) {
      this.pos = -1;
      this.finalizado(cita);
      return this.pos;
    }

    // ya paso el mes, dia o año?
    if (anio > anioH || mes > mesH || dia > (diaH + 7)) {
      this.pos = 2;
      return this.pos;
    }

    if (dia < diaH) {
      this.pos = -1;
      this.finalizado(cita);
    } else if (dia <= (diaH + 7) && dia > diaH) {
      this.pos = 1;
    } else {
      this.pos = 0;
    }

    return this.pos;
  }

  getNota(index: number) {
    return this.notas[index].observacion.substring(500, -1);
  }
  getNotaPrevia(index: number) {
    return this.notas[index].observacionPrevia.substring(500, -1);
  }

  muestra(index: number) {
    console.log(index, '=', this.notas[index]);
  }


}
