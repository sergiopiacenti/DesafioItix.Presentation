import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
  { path: '', component: ConsultasComponent, pathMatch: 'full' },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'consulta/:id', component: ConsultaComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
