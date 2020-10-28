import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  user=null;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  LogOut(){
    this.router.navigate(['login']);
  }
}
