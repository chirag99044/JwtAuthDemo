import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 form;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      Username: [''],
      Password: ['']
    });
  }

  onSubmit() {
    this.auth.register(this.form.value).subscribe({
      next: () => {
        alert('Registered successfully');
        this.router.navigate(['/login']);
      },
      error: () => alert('Registration failed')
    });
  }
}
