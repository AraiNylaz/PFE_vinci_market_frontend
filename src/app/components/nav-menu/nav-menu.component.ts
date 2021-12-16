import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  get currentUser() {
    return this.authenticationService.currentUser;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.admin === true;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  profil() {
    this.router.navigate(['/profil']);
  }

  home() {
    this.router.navigate(['/']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  annonces() {
    this.router.navigate(['/annonces']);
  }

  ajouterAnnonce() {
    this.router.navigate(['/ajouterAnnonce']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  validerAnnonces() {
    this.router.navigate(['/validerAnnonces']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
