import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { CitasComponent } from './components/citas/citas.component';
import { ProfileComponent } from './components/students/profile/profile.component';
import { DateStdComponent } from './components/students/date-std/date-std.component';
import { TutoriasStdComponent } from './components/students/tutorias-std/tutorias-std.component';
import { GoeStdComponent } from './components/students/goe-std/goe-std.component';
import { AsesoriasStdComponent } from './components/students/asesorias-std/asesorias-std.component';
import { BaseStdComponent } from './components/students/base-std/base-std.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StudentsComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    CitasComponent,
    DateStdComponent,
    TutoriasStdComponent,
    GoeStdComponent,
    AsesoriasStdComponent,
    BaseStdComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
