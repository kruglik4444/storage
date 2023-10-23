import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../pages/login/login.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  private destroyed$ = new Subject<void>();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.user.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.loginService.logOut();
  }
}
