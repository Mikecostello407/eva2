import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { LoginModule } from '../login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistroModule } from '../registro/registro.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginModule,
    HttpClientModule,
    RegistroModule

  ],
  declarations: [HomePage]
  
})
export class HomePageModule {}
