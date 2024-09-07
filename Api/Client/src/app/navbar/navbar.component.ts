import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../features/shared/services/auth.service';
import { User } from '../features/shared/models/user.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: User | undefined;
  constructor(private authServise: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authServise.user().subscribe(user => {
      console.log(user)
      this.user = user;
    });

    this.user = this.authServise.getUser();
  }
  onLogout() {
    this.authServise.logout();
    this.router.navigate(['/']);
  }
}
