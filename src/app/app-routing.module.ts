import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './service/guard.service';

const routes: Routes = [
  { path:'albums', component : AlbumsComponent},
  { path:'', redirectTo: '/albums', pathMatch:'full'},
  { path:'login', component : LoginComponent},
  { path:'register', component : RegisterComponent},
  { path:'album/:id', component : AlbumDescriptionComponent},
  { path:'dashboard/', canActivate: [GuardService], component : DashboardComponent},
] 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
