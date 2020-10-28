import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  @Input() isMorningShift:boolean;
  constructor() { }

  afternoonShiftHours = ['15:00 - 15:50','15:50 - 16:40','16:40 - 17:30','17:30 - 18:20','18:20 - 19:10','19:10 - 20:00','20:00 - 20:50','20:50 - 21:40']
  subjects = ['Español','Matemáticas','Historia','         ','Lógica','Cultura comparada','   ',' ']
  ngOnInit(): void {
  }

}
