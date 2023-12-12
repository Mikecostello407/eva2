// registro.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegistroComponent } from './registro.component';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    IonicModule, // Asegúrate de incluir esta línea
    // ...otros módulos
  ],
  exports: [RegistroComponent]
})
export class RegistroModule { }
