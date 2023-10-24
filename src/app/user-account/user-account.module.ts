import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { AppMaterialModule } from '../app-material.module';



@NgModule({
  declarations: [
    UserAccountComponent
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    AppMaterialModule
  ]
})
export class UserAccountModule { }
