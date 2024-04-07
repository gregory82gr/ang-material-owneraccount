import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '../error-pages/server-error/server-error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'owner', loadChildren: () => import('./../owner/owner.module').then(m => m.OwnerModule) }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent}, 
  { path: '**', redirectTo: '/404', pathMatch: 'full'},
  { path: '500', component: ServerErrorComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
