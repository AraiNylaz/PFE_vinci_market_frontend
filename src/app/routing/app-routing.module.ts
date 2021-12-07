import { Routes, RouterModule } from '@angular/router';
import { AnnoncesComponent } from '../components/annonces/annonces.component';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfilComponent } from '../components/profil/profil.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { UserListComponent } from '../components/userlist/userlist.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'annonces',
    component: AnnoncesComponent,
  },
  {
    path: 'profil',
    component: ProfilComponent,
  },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
