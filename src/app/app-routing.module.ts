import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppoinmentComponent} from './appoinment/appoinment.component'
const routes: Routes = [
  {
    path:'',component:AppoinmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
