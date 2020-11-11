import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { TiraMateriasModel } from '../../../models/tiraMaterias.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  tiraMaterias: TiraMateriasModel[];

  constructor(private as: AlumnosService) {}

  ngOnInit(): void {
    if (this.as.tiraMaterias === undefined){
      const promesaTiraMaterias = new Promise((resolve) => {
        this.as.getTiradeMaterias(this.as.student.grupo).subscribe(resp => {
          this.as.tiraMaterias = resp;
          this.tiraMaterias = this.as.tiraMaterias;
          console.log(this.as.tiraMaterias);
        });
      }).then(() => {
        this.tiraMaterias = this.as.tiraMaterias;
      });
    }else{
      this.tiraMaterias = this.as.tiraMaterias;
    }
  }

}
