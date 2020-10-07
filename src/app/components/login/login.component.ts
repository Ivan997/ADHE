import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from '../../services/api.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
  }

  Login(credentials: NgForm) {
   console.log('login...');
   this.router.navigate(['inicio']);
  }
}
