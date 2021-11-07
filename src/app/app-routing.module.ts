import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { FormularioComponent } from './Pages/formulario/formulario.component';
import { ListadoComponent } from './Pages/listado/listado.component';
import { AdmiComponent } from './Components/admi/admi.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'/admin', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'formulario', component:FormularioComponent},
  {path:'listado', component:ListadoComponent},
  {path:'admin', component:AdmiComponent},
  {path:'registro', component:RegistroComponent},
  {path:'home', component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
