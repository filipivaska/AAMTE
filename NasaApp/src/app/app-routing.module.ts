import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'epic',
    loadChildren: './epic/epic.module#EpicPageModule'
  },  { path: 'apod', loadChildren: './apod/apod.module#ApodPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
