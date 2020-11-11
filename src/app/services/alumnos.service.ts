import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';
import { ObservacionesModel } from '../models/observaciones.model';
import { CitasModel } from '../models/citas.model';
import { stringify } from '@angular/compiler/src/util';
import { AlumnoModel } from '../models/alumno.model';
import { HorarioModel } from '../models/horario.model';
import { TiraMateriasModel } from '../models/tiraMaterias.model';
import { getTestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  student = new AlumnoModel();

  horario: HorarioModel[];
  tiraMaterias: TiraMateriasModel[];

  alumnoActual = '';

  private url = 'https://adhe-51a66.firebaseio.com/';

  fecha1 = new Date('12/09/2019');//MM/DD/AAAA HH:MM:SS
  fecha2 = new Date('09/24/2020');//MM/DD/AAAA HH:MM:SS
  fecha3 = new Date('09/23/2020');//MM/DD/AAAA HH:MM:SS
  fecha4 = new Date('01/01/2020');//MM/DD/AAAA HH:MM:SS
  fecha5 = new Date('12/21/2020');//MM/DD/AAAA HH:MM:SS

  constructor(private http: HttpClient) { }

  private getTodosAlumnos(alumnosObj: object) {

    let alumno: AlumnoModel[] = [];
    if (alumnosObj === null) { return []; }

    Object.keys(alumnosObj).forEach(key => {

      const al = {
        carrera: alumnosObj[key].carrera,
        grupo: alumnosObj[key].grupo,
        nivel: alumnosObj[key].nivel,
        nombre: alumnosObj[key].nombre,
        registro: alumnosObj[key].registro,
        tipo: alumnosObj[key].tipo,
        turno: alumnosObj[key].turno
      };
      // console.log('encontrado');
      alumno.push(al);

    });

    // console.log(alumno);
    return alumno;

  }
  private getAlumnoCorrecto(alumnosObj: object, registro: string) {

    let alumno = new AlumnoModel();
    if (alumnosObj === null) { return []; }

    Object.keys(alumnosObj).forEach(key => {

      if (alumnosObj[key].registro === parseInt(registro)) {
        const al = {
          carrera: alumnosObj[key].carrera,
          grupo: alumnosObj[key].grupo,
          nivel: alumnosObj[key].nivel,
          nombre: alumnosObj[key].nombre,
          registro: alumnosObj[key].registro,
          tipo: alumnosObj[key].tipo,
          turno: alumnosObj[key].turno
        };
        // console.log('encontrado');
        alumno = al;
      }
    });

    // console.log(alumno);
    return alumno;

  }

  actualizarCita(cita: CitasModel): any {
    return this.http.put(`${this.url}/citas/${cita.id}.json`, cita);
  }

  // CREACIONES

  private crearArregloCitas(citasObj: object): CitasModel[] {
    const cits: CitasModel[] = [];

    console.log(citasObj);

    if (citasObj === null) { return []; }
    Object.keys(citasObj).forEach(key => {
      const ob: CitasModel = citasObj[key];
      ob.id = key;

      cits.push(ob);
    });

    return cits;
  }

  private crearArregloTiraMat(tiraMat: object, grupo: string): TiraMateriasModel[]{
    const tiras: TiraMateriasModel[] = [];

    if (tiraMat === null){ return []; }

    Object.keys(tiraMat).forEach(key => {
      if (grupo === tiraMat[key].grupo){
        const tirxs: TiraMateriasModel = tiraMat[key];
        tiras.push(tirxs);
      }
    });

    return tiras;

  }

  private crearArregloHorario(horarioObj: object, grupo: string): HorarioModel[]{
    const hors: HorarioModel[] = [];

    if (horarioObj === null){ return []; }

    Object.keys(horarioObj).forEach(key => {
      if (grupo === horarioObj[key].grupo){
        const horx: HorarioModel = horarioObj[key];
        hors.push(horx);
      }
    });
    return hors;
  }

  private crearArregloObs(observacionesObj: object): ObservacionesModel[] {
    const obs: ObservacionesModel[] = [];

    if (observacionesObj === null) { return []; }
    Object.keys(observacionesObj).forEach(key => {
      const ob: ObservacionesModel = observacionesObj[key];
      ob.id = key;

      obs.push(ob);
    });

    return obs;
  }

  crearObservacion(observacion): any {

    if (observacion.id !== '') {
      return;
    }

    return this.http.post(`${this.url}/observaciones.json`, observacion)
      .pipe(
        map((resp: any) => {
          observacion.id = resp.name;
          return observacion;
        })
      );
  }

  crearCita(cita: CitasModel): any {

    if (cita.id !== '') {
      return;
    }

    return this.http.post(`${this.url}/citas.json`, cita)
      .pipe(
        map((resp: any) => {
          cita.id = resp.name;
          return cita;
        })
      );

  }

  //GETTERS

  getAlumnos(registro: string): any {
    this.alumnoActual = registro;
    return this.http.get(`${this.url}/alumnos.json`)
      .pipe(
        map(resp => {
          if (registro != '') {
            return this.getAlumnoCorrecto(resp, registro);
          } else {
            return this.getTodosAlumnos(resp);
          }
        })
      );
  }

  getTiradeMaterias(grupo:string): any{
    return this.http.get(`${this.url}/tiraMaterias.json`).pipe(
      map( resp => this.crearArregloTiraMat(resp, grupo))
    );
  }

  getHorario(grupo: string): any {
    return this.http.get(`${this.url}/Horarios.json`).pipe(
      map(resp => this.crearArregloHorario(resp, grupo))
    );
  }

  getCitas(): any {
    return this.http.get(`${this.url}/citas.json`)
      .pipe(
        map(this.crearArregloCitas)
      );
  }

  getObservaciones(): any {
    return this.http.get(`${this.url}/observaciones.json`)
      .pipe(
        map(this.crearArregloObs)
      );
  }
}
