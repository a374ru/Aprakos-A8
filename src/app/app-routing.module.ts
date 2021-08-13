import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaskhaComponent } from './paskha/paskha.component';
import { ComponentTestingComponent } from './component-testing/component-testing.component';

const routes: Routes = [

  { path: 'paskha', component: PaskhaComponent },
  { path: 'component-testing', component: ComponentTestingComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class  AppRoutingModule { }
