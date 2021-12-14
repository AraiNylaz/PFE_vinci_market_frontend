import { Routes, RouterModule } from '@angular/router';
import { AnnoncesComponent } from '../components/annonces/annonces.component';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfilComponent } from '../components/profil/profil.component';
import { ModifierProfilComponent } from '../components/modifierProfil/modifierProfil.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { UserListComponent } from '../components/userlist/userlist.component';
import { ValiderAnnoncesComponent } from '../components/validerAnnonces/validerAnnonces.component';
import { AnnoceDetailComponent } from '../components/annonceDetail/annonceDetail.component';
import { AjouterOffreComponent } from '../components/ajouterOffre/ajouterOffre.component';

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
    path: 'annonceDetail/:id',
    component: AnnoceDetailComponent,
  },
  {
    path: 'profil',
    component: ProfilComponent,
  },
  {
    path: 'modifierProfil',
    component: ModifierProfilComponent,
  },
  {
    path: 'validerAnnonces',
    component: ValiderAnnoncesComponent,
  },
  {
    path: 'ajouterOffre/:id',
    component: AjouterOffreComponent,
  },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
