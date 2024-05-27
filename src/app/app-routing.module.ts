import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RayaComponent } from './raya/raya.component';
import { FlotaComponent } from './flota/flota.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PaymentsComponent } from './payments/payments.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {path: 'Home', component: HomeComponent},
  {path:'Juegos', component: RayaComponent},
  {path: 'Registro', component: RegisterComponent}, 
  {path: 'Login', component: LoginComponent},
  {path: 'Estadisticas', component: EstadisticasComponent},
  {path: 'Flota', component: FlotaComponent}, 
  { path: 'payments', component: PaymentsComponent },

];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
