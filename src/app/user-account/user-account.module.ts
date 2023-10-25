import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { DasboardComponent } from './components/dasboard/dasboard.component';



@NgModule({
  declarations: [
    UserAccountComponent,
    DasboardComponent,
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    AppMaterialModule
  ]
})
export class UserAccountModule { }
