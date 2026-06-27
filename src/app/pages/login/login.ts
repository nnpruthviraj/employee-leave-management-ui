import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {

    this.authService.login(
      this.userName,
      this.password
    ).subscribe({

      next: (response) => {

        const token = response.data.token;
        const role = response.data.role;

        this.authService.saveToken(token);
        this.authService.saveRole(role);

        if (role === 'Admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/leaves']);
        }
      },

      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Check console.';
      }
    });
  }
}
