import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFalconeComponent } from './search-falcone.component';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '', component: SearchFalconeComponent
  }
];

@NgModule({
  declarations: [SearchFalconeComponent, PlanetsComponent, VehiclesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class SearchFalconeModule { }
