import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { ObservacionesModel } from '../../../models/observaciones.model';

@Component({
  selector: 'app-asesorias-std',
  templateUrl: './asesorias-std.component.html',
  styles: [
  ]
})
export class AsesoriasStdComponent implements OnInit {

  constructor(private as: AlumnosService) { }

  observaciones = false;
  clases = false;
  citasAnteriores = false;
  today = new Date();
  pos = -1;

  fecha1 = new Date('12/09/2019');//MM/DD/AAAA HH:MM:SS
  fecha2 = new Date('10/12/2019');//MM/DD/AAAA HH:MM:SS
  fecha3 = new Date('09/12/2020');//MM/DD/AAAA HH:MM:SS
  fecha4 = new Date('01/01/2020');//MM/DD/AAAA HH:MM:SS

  notas: ObservacionesModel [] = [];

  class = [
    {name: 'Matematicas', attendant: 'Ivan Arredondo', asistenciaP1: 10, partial1: 100, asistenciaP2: 10, partial2: 50, partial3: 0, asistenciaP3: 10, average: 0},
    {name: 'Español', attendant: 'Ivan Arredondo', asistenciaP1: 10, partial1: 100, asistenciaP2: 10, partial2: 50, partial3: 20, asistenciaP3: 10, average: 0},
    {name: 'Ingles', attendant: 'Jessica Lizette', asistenciaP1: 10, partial1: 100, asistenciaP2: 10, partial2: 50, partial3: 0, asistenciaP3: 10, average: 0}
  ];

  ngOnInit(): void {

    this.as.getObservaciones('Asesorias').subscribe(resp => {
      console.log(resp);
      this.notas = resp;
    });

    // this.notas.sort((a, b) => {
    //   return b.fecha.getTime() - a.fecha.getTime();
    // });
  }

  getNota(index: number){
    return this.notas[index].observacion.substring(500, -1);
  }

  muestra(index: number){
    console.log(index, '=' , this.notas[index]);
  }

  getAverage(index: number): number{
    this.class[index].average = (( this.class[index].partial1 + this.class[index].partial2 + this.class[index].partial3) / 3);

    return this.class[index].average;
  }

}
