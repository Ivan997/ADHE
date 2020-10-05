import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { CitasComponent } from './components/citas/citas.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'inicio', component: DashboardComponent, children: [
    {path: 'estudiantes', component: StudentsComponent},
    {path: 'citas', component: CitasComponent},
    {path: '**', redirectTo: 'estudiantes'},
  ]},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
