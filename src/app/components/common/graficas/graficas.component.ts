import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  @Input() lineaChartType: string = 'pie';
  @Input() titulo: string;

  public lineaChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  public lineaChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineaChartOptions: any = {
    responsive: true
  };

  public lineaChartColors: Array<any> = [
  //   {//gris
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   {//gris - obscuro
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   {//gris
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  ];

  public lineaChartLegend: boolean = true;
  // public lineaChartType: string = this.tipo;

  constructor() { }

  ngOnInit(): void {
  }

  public randomize(): void{
    let _lineChartData: Array<any> = new Array(this.lineaChartData.length);
    for (let i = 0; i < this.lineaChartData.length; i++){
      _lineChartData[i] = {data: new Array(this.lineaChartData[i].data.length), label: this.lineaChartData[i].label};
      for (let j = 0; j < this.lineaChartData[i].data.length; j++){
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1 );
      }
    }
    this.lineaChartData = _lineChartData;
  }


  public chartClicked( e: any ): void{
    // console.log(e);
  }

  public chartHovered( e: any ): void{
    // console.log(e);
  }

}
