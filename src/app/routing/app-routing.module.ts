import { Routes, RouterModule } from '@angular/router';
import { AnnoncesComponent } from '../components/annonces/annonces.component';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfilComponent } from '../components/profil/profil.component';
import { ModifierProfilComponent } from '../components/modifierProfil/modifierProfil.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { UserListComponent } from '../components/userlist/userlist.component';
import { ValiderAnnoncesComponent } from '../components/validerAnnonces/validerAnnonces.component';
import { AnnonceDetailComponent } from '../components/annonceDetail/annonceDetail.component';
import { AjouterOffreComponent } from '../components/ajouterOffre/ajouterOffre.component';
import { OffresComponent } from '../components/offres/offres.component';
import { AjouterAnnonceComponent } from '../components/ajouterAnnonce/ajouter_annonce.component';
import { AuthGuard } from '../services/auth.guard';
import { MesAnnoncesComponent } from '../components/listMesAnnonces/mesAnnonces.component';

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
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'annonces',
    component: AnnoncesComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
  {
    path: 'annonceDetail/:id',
    component: AnnonceDetailComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
  {
    path: 'offres/:id',
    component: OffresComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
  {
    path: 'modifierProfil',
    component: ModifierProfilComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
  {
    path: 'validerAnnonces',
    component: ValiderAnnoncesComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin'] },
  },
  {
    path: 'ajouterOffre/:id',
    component: AjouterOffreComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
  {
    path: 'ajouterAnnonce',
    component: AjouterAnnonceComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
  {
    path: 'mesAnnonces',
    component: MesAnnoncesComponent,
    canActivate: [AuthGuard],
    data: { role: ['user'] },
  },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
