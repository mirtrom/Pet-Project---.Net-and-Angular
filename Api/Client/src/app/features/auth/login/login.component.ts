import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../shared/models/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginRequest = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }
  onSubmit() {
    //console.log(this.model);
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
        this.authService.setUser({
            email: this.model.email,
            roles: response.roles
          });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

