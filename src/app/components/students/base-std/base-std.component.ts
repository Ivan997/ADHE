import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlumnosService } from '../../../services/alumnos.service';

@Component({
  selector: 'app-base-std',
  templateUrl: './base-std.component.html',
  styles: [
  ]
})
export class BaseStdComponent implements OnInit {

  seleccion = '';

  constructor(private router: ActivatedRoute, private as: AlumnosService) {
    this.router.params.subscribe( params => as.alumnoActual = params['id']);
   }

  ngOnInit(): void {}


}
