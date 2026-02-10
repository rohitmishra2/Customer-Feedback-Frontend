import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn() {
    return !!this.auth.getToken();
  }

  isAdmin() {
    return this.auth.isAdmin();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goHome() {
    if (this.isAdmin()) this.router.navigate(['/admin']);
    else if (this.isLoggedIn()) this.router.navigate(['/user']);
    else this.router.navigate(['/login']);
  }
}
