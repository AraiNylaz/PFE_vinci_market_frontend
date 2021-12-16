import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutes } from '../routing/app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { HomeComponent } from '../components/home/home.component';
import { NavMenuComponent } from '../components/nav-menu/nav-menu.component';
import { UserListComponent } from '../components/userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { AnnoncesComponent } from '../components/annonces/annonces.component';
import { ProfilComponent } from '../components/profil/profil.component';
import { OffresComponent } from '../components/offres/offres.component';
import { ModifierProfilComponent } from '../components/modifierProfil/modifierProfil.component';
import { MapComponent } from '../components/map/map.component';
import { ValiderAnnoncesComponent } from '../components/validerAnnonces/validerAnnonces.component';
import { AnnonceDetailComponent } from '../components/annonceDetail/annonceDetail.component';
import { ModifierAnnonceComponent } from '../components/modifierAnnonce/modifierAnnonce.component';
import { AjouterOffreComponent } from '../components/ajouterOffre/ajouterOffre.component';
import { AjouterAnnonceComponent } from '../components/ajouterAnnonce/ajouter_annonce.component';
import { AuthGuard } from '../services/auth.guard';
import { MesAnnoncesComponent } from '../components/listMesAnnonces/mesAnnonces.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    NavMenuComponent,
    UserListComponent,
    AnnoncesComponent,
    ProfilComponent,
    OffresComponent,
    ModifierProfilComponent,
    MapComponent,
    ValiderAnnoncesComponent,
    AnnonceDetailComponent,
    ModifierAnnonceComponent,
    AjouterOffreComponent,
    AjouterAnnonceComponent,
    MesAnnoncesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutes,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
