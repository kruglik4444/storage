import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthResponeData, LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;

  errorMessage!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      userName: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  login(mode: string) {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.userName;
    const password = this.form.value.password;

    let loginObs: Observable<AuthResponeData>;

    if (mode === 'signUp') {
      loginObs = this.loginService.signUp(email, password);
    } else {
      loginObs = this.loginService.signIn(email, password);
    }

    loginObs.subscribe({
      next: () => {
        if(mode === 'signUp') {
          this.router.navigate(['/edit-profile'])
        } else {
          return;
        }
        this.errorMessage = '';
      },
      error: (error) => this.errorMessage = error, 
    })
  }
}
