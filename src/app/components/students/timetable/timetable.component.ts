import { Component, Input, OnInit } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { HorarioModel } from '../../../models/horario.model';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  @Input() isMorningShift:boolean;

  horarioActivo = false;

  constructor(private as: AlumnosService) { }

  afternoonShiftHours = ['15:00 - 15:50', '15:50 - 16:40', '16:40 - 17:30', '17:30 - 18:20', '18:20 - 19:10', '19:10 - 20:00', '20:00 - 20:50', '20:50 - 21:40']
  ngOnInit(): void {

    if (this.as.horario === undefined){
      const promesaHorario = new Promise((resolve) => {
        this.as.getHorario(this.as.student.grupo).subscribe(resp => {
          this.as.horario = resp;
          resolve();
        });
      }).then(() => this.horarioActivo = true);
    }else{ this.horarioActivo = true; }
  }

  getMateriaHorario(dia: string, index: number): string{

    let encontrado = false;
    // console.log(this.horarioActivo);
    if (this.horarioActivo){
      let retorno = '';
      this.as.horario.forEach((mat: HorarioModel) => {
        if (mat.dia === dia && (index >= mat.inic && index <= mat.fin) ){
          retorno = mat.materia + '\nLugar: ' + mat.lugar;
          // console.log(index, mat.inic, mat.fin);
          // console.log(mat.materia);
          encontrado = true;
        }
      });
      return retorno;
    }
  }

}
