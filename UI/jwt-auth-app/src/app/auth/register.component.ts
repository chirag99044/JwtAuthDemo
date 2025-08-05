import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
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
      error: (err) => {
        if(err.status === 200) {
          alert('Registration successful');
          this.router.navigate(['/login']);
        }else if(err.status === 400) {
           alert('Username already exists');
        }
        else {
          alert('Registration failed: ');
        }
      }
    });
  }
}
