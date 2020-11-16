import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'result', component: ResultComponent },
  {
    path: 'searchFalcone',
    loadChildren: () => import('./components/search-falcone/search-falcone.module').then(mod => mod.SearchFalconeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



