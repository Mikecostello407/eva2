import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'conductores',
    canActivate: [AuthGuard],
    loadChildren: () => import('./conductores/conductores.module').then( m => m.ConductoresPageModule)
  },
  {
    
    path: 'detalle-conductor/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./detalle-conductor/detalle-conductor.module').then( m => m.DetalleConductorPageModule)
  },

  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
