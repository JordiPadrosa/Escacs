import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariComponent } from './projecte/components/formulari/formulari.component';
import { JugarComponent } from './projecte/components/jugar/jugar.component';

const routes: Routes = [
  {
    path: 'formulari',
    component: FormulariComponent,
  },
  {
    path: 'jugar',
    component: JugarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
