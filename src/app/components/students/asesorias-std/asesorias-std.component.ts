import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { ObservacionesModel } from '../../../models/observaciones.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { AsesoriaModel } from '../../../models/asesorias.model';
import Swal from 'sweetalert2';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { KeyedRead, ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-asesorias-std',
  templateUrl: './asesorias-std.component.html',
  styles: [
  ]
})
export class AsesoriasStdComponent implements OnInit {
  forma: FormGroup;

  observaciones = false;
  clases = false;
  vacio = false;
  graficas = false;
  citasAnteriores = false;
  today = new Date();
  pos = -1;
  class = [];
  notas: ObservacionesModel[] = [];

  public lineaChartData: Array<any> = [
    {data: [65, 59, 80], label: 'Series aksdu'},
    {data: [28, 48, 40], label: 'Series adska'}
  ];
  public lineaChartLabels: Array<any> = ['1er P', '2do P', '3er P'];

  constructor(private as: AlumnosService, private modalService: NgbModal, private fb: FormBuilder) {


  }

  ngOnInit(): void {

    this.lineaChartData = [];
    this.observaciones = false;
    this.clases = false;
    this.vacio = false;
    this.graficas = false;
    this.citasAnteriores = false;
    this.today = new Date();
    this.pos = -1;
    this.class = [];

    const observaciones = this.as.getObservaciones().subscribe(
      (notes) => {
        this.notas = notes.filter((note) => note.area === 'Asesorias' && note.registro === this.as.alumnoActual);
      }
    );

    const promesaActualizarDatos = new Promise((resolve) => {
      if ( this.getAsesorias() ){
        resolve();
      }
    }).then( () => {
      this.graficas = true;
      this.clases = true;
    });
    // setInterval(() => { this.getAsesorias(); } , 10000);
  }

  private getAsesorias(){

    this.graficas = false;
    this.vacio = false;

    this.class = [];
    // console.log('linearChartData:');
    // console.log(this.lineaChartData);
    this.lineaChartData = new Array();

    return new Promise<boolean>((resolve, reject) => {
      this.as.getAsesorias().subscribe(( resp: any[] ) => {
        resp.forEach(key => {
          // console.log('get Asesorias');
          if (stringify(key.registro) === this.as.alumnoActual && key.materia !== undefined){
            const ob = {
              id: key.id,
              name: key.materia,
              attendant: key.profesor,
              asistenciaP1: key.asistenciaP1 ,
              partial1: key.parcialP1 ,
              asistenciaP2: key.asistenciaP2,
              partial2: key.parcialP2 ,
              partial3: key.parcialP3 ,
              asistenciaP3: key.asistenciaP3,
              average: key.promedio
            };
            const data = {
              data: [
                key.parcialP1,
                key.parcialP2,
                key.parcialP3
              ],
              label: key.materia
            };
            this.class.push(ob);
            // console.log('data:');
            // console.log(data);
            this.lineaChartData.push(data);
            // console.log('linearChartData:');
            // console.log(this.lineaChartData);
          }
        });
        resolve();
      });
    }).then(() => {
      console.log('this.lineaChartData.length');
      console.log(this.lineaChartData);
      if (this.lineaChartData.length !== 0 ){
        // this.graficas = true;
        this.vacio = false;
      }else{
        return true;
      }
    }).catch(() => false);

  }

  getNota(index: number) {
    return this.notas[index].observacion.substring(500, -1);
  }

  getAverage(index: number): number {
    if (this.class[index].partial1 > 0 && this.class[index].partial2 > 0 && this.class[index].partial3 > 0){
      this.class[index].average = ((this.class[index].partial1 + this.class[index].partial2 + this.class[index].partial3) / 3);
      return this.class[index].average;
    }else{
      return 0.0;
    }
  }

  open(content) {
    this.crearFormulario();
    this.modalService.open(content, { backdrop: 'static' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  crearFormulario() {
    this.forma = this.fb.group({
      materia: ['', [Validators.required]],
      profesor: ['', [Validators.required]],
      asistencia1P: ['', [Validators.required]],
      calificacion1P: ['', [Validators.required]],
      asistencia2P: ['', [Validators.required]],
      calificacion2P: ['', [Validators.required]],
      asistencia3P: ['', [Validators.required]],
      calificacion3P: ['', [Validators.required]],
      registro: ['', [Validators.required]],
    });
    this.cargarDatos();
  }

  cargarDatos() {
    this.forma.setValue({
      materia: '',
      profesor: '',
      asistencia1P: 0,
      calificacion1P: 0,
      asistencia2P: 0,
      calificacion2P: 0,
      asistencia3P: 0,
      calificacion3P: 0,
      registro: this.as.alumnoActual
    });
  }

  get materiaValido() {
    return this.forma.get('materia').invalid && this.forma.get('materia').touched;
  }
  get profesorValido() {
    return this.forma.get('profesor').invalid && this.forma.get('profesor').touched;
  }

  clickAgregar(modal){
      this.actualizarAsesorias('', this.forma.get('materia').value, this.forma.get('profesor').value, 0, 0, 0, 0, 0, 0 );
      modal.close('Save click');
      const promesaActualizarDatos = new Promise((resolve) => {

        setTimeout(() => {
          if ( this.getAsesorias() ){
            resolve();
          }
        }, 2000);

      }).then( () => {
        this.graficas = true;
        this.clases = true;
      });
  }

  guardar(){

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando Formulario',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.class.forEach( key => {

      let txt = 'partial1-' + key.id;
      const p1: number = parseFloat((document.getElementById(txt)as HTMLInputElement).value);
      txt = 'partial2-' + key.id;
      const p2: number = parseFloat((document.getElementById(txt)as HTMLInputElement).value);
      txt = 'partial3-' + key.id;
      const p3: number = parseFloat((document.getElementById(txt)as HTMLInputElement).value);
      txt = 'asistenciaP1-' + key.id;
      const aP1: number = parseFloat((document.getElementById('asistenciaP1-' + key.id)as HTMLInputElement).value);
      txt = 'asistenciaP2-' + key.id;
      const aP2: number = parseFloat((document.getElementById('asistenciaP2-' + key.id)as HTMLInputElement).value);
      txt = 'asistenciaP3-' + key.id;
      const aP3: number = parseFloat((document.getElementById('asistenciaP3-' + key.id)as HTMLInputElement).value);

      const prom = ((p1 + p2 + p3 ) / 3);

      const ob: AsesoriaModel = {
        id: key.id,
        registro: this.as.alumnoActual,
        materia: key.name,
        profesor: key.attendant,
        asistenciaP1: aP1,
        parcialP1: p1,
        asistenciaP2: aP2,
        parcialP2: p2,
        asistenciaP3: aP3,
        parcialP3: p3,
        promedio: prom,
      };

      this.as.actualizarAsesorias(ob).subscribe();

    });


    this.lineaChartData = [];
    this.observaciones = false;
    this.clases = false;
    this.vacio = false;
    this.graficas = false;
    this.citasAnteriores = false;
    this.today = new Date();
    this.pos = -1;
    this.class = [];

    const promesaActualizarDatos = new Promise((resolve) => {

      setTimeout(() => {
        if ( this.getAsesorias() ){
          resolve();
        }
      }, 2000);

    }).then( () => {
      this.graficas = true;
      this.clases = true;
    });

    Swal.fire({
      icon: 'success',
      title: 'OK',
      text: 'Se agrego correctamente'
    });



  }

  private actualizarAsesorias(id: string, materia: string, profesor: string,
                              asist1: number, asist2: number, asist3: number,
                              parc1: number, parc2: number, parc3: number): boolean{

    const elemento: AsesoriaModel = {
      id ,
      registro: this.as.alumnoActual,
      materia,
      profesor,
      asistenciaP1: asist1 ,
      parcialP1: parc1,
      asistenciaP2: asist2 ,
      parcialP2: parc2,
      asistenciaP3: asist3 ,
      parcialP3: parc3,
      promedio: ((parc1 + parc2 + parc3) / 3) ,
    };

    if (id === ''){
      this.as.crearAsesoria(elemento).subscribe();
    }else{
      this.as.actualizarAsesorias(elemento).subscribe();
    }

    const p = new Promise ((resolve) => {
      Swal.fire({
        icon: 'info',
        title: 'Espere',
        text: 'Guardando Materia Nueva',
        allowOutsideClick: false
      });
      Swal.showLoading();

      setTimeout(() => { resolve(); }, 2000 );
    }).then(() => {
      this.clases = false;
      this.graficas = false;
      const promesaAsesorias = new Promise((resolve) => {
       resolve();
      }).then(() => {
        // this.clases = true;
        this.graficas = true;
        Swal.fire({
          icon: 'success',
          title: 'OK',
          text: 'Se agrego correctamente'
        });
      });
     } );

    return true;

  }
}


