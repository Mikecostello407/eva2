import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
