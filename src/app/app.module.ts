import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
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
import { GraficasComponent } from './components/common/graficas/graficas.component';
import { TimetableComponent } from './components/students/timetable/timetable.component';
import { SubjectsComponent } from './components/students/subjects/subjects.component';
import { ObservacionesComponent } from './components/common/observaciones/observaciones.component';
import { FormularioCitasComponent } from './components/common/citas/formulario-citas/formulario-citas.component';
import { FormularioFormatoComponent } from './components/common/formulario-formato/formulario-formato.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    BaseStdComponent,
    GraficasComponent,
    TimetableComponent,
    ObservacionesComponent,
    FormularioCitasComponent,
    SubjectsComponent,
    FormularioFormatoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
