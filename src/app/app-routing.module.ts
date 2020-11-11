import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { ProfileComponent } from './components/students/profile/profile.component';
import { CitasComponent } from './components/citas/citas.component';
import { BaseStdComponent } from './components/students/base-std/base-std.component';
import { DateStdComponent } from './components/students/date-std/date-std.component';
import { TutoriasStdComponent } from './components/students/tutorias-std/tutorias-std.component';
import { GoeStdComponent } from './components/students/goe-std/goe-std.component';
import { AsesoriasStdComponent } from './components/students/asesorias-std/asesorias-std.component';
import { ObservacionesComponent } from './components/common/observaciones/observaciones.component';
import { FormularioCitasComponent } from './components/common/citas/formulario-citas/formulario-citas.component';
import { FormularioFormatoComponent } from './components/common/formulario-formato/formulario-formato.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'inicio', component: DashboardComponent, children: [
      {
        path: 'estudiantes', children: [
          { path: '', component: StudentsComponent },
          {
            path: ':id', component: BaseStdComponent, children: [
              { path: 'formObserv', component: ObservacionesComponent },
              { path: 'formCita', component: FormularioCitasComponent },
              { path: 'formFormato', component: FormularioFormatoComponent },
              { path: 'perfil', component: ProfileComponent },
              { path: 'citas', component: DateStdComponent },
              { path: 'tutorias', component: TutoriasStdComponent },
              { path: 'goe', component: GoeStdComponent },
              { path: 'asesorias', component: AsesoriasStdComponent },
              { path: '**', redirectTo: 'perfil' }
            ]
          }
        ]
      },
      { path: 'citas', component: CitasComponent },
      { path: '**', redirectTo: 'estudiantes' },
    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
