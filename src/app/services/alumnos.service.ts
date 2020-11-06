import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ObservacionesModel } from '../models/observaciones.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private url = 'https://adhe-51a66.firebaseio.com/';

  fecha1 = new Date('12/09/2019');//MM/DD/AAAA HH:MM:SS
  fecha2 = new Date('09/24/2020');//MM/DD/AAAA HH:MM:SS
  fecha3 = new Date('09/23/2020');//MM/DD/AAAA HH:MM:SS
  fecha4 = new Date('01/01/2020');//MM/DD/AAAA HH:MM:SS
  fecha5 = new Date('10/21/2020');//MM/DD/AAAA HH:MM:SS

  constructor( private http: HttpClient) { }

  crearObservacion( observacion ): any{

    if (observacion.id !== ''){
      return;
    }

    return this.http.post(`${this.url}/observaciones.json`, observacion)
    .pipe(
      map( (resp: any) => {
        observacion.id = resp.name;
        return observacion;
      })
    );
  }

  getObservaciones( tipo: string ): any{

    // let params;

    // switch(tipo){
    //   case 'GOE':
    //     params = new HttpParams().set('area', 'GOE');
    //     break;
    //   case 'Tutorias':
    //     params = new HttpParams().set('area', 'Tutorias');
    //     break;
    //   default:
    //     params = new HttpParams().set('area', 'Tutorias');
    //     break;
    // }

    return this.http.get(`${this.url}/observaciones.json`)
    .pipe(
      map(this.crearArregloObs)
    );
  }

  private crearArregloObs( observacionesObj: object): ObservacionesModel[]{
    const obs: ObservacionesModel[] = [];

    if ( observacionesObj === null) {return []; }
    Object.keys( observacionesObj ).forEach( key =>{
      const ob: ObservacionesModel = observacionesObj[key];
      ob.id = key;

      obs.push( ob );
    });

    console.log( 'observaciones' );
    // console.log(obs);

    return obs;
  }
}
