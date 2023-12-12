// home.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username: string;
  tieneAuto: boolean;
  isAuthenticated: boolean;

  constructor(public authService: AuthService) {
    this.username = authService.getUserName();
    this.isAuthenticated = authService.isAuth();
    this.tieneAuto = this.isAuthenticated ? authService.tieneAuto() : false;
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    // Verificar si el usuario está autenticado
    if (this.isAuthenticated) {
      this.tieneAuto = this.authService.tieneAuto(); // Actualiza el valor de tieneAuto al entrar en la vista

      if (this.tieneAuto) {
        console.log('Mostrando contenido para conductores');
        // Lógica adicional para conductores
      } else {
        console.log('Mostrando contenido para pasajeros');
        // Lógica adicional para pasajeros
      }
    }
  }

  solicitarViaje(): void {
    const solicitud = {
      fecha: new Date().toISOString(),
      // Otros campos de la solicitud
    };
  
    // Pasa el nombre de usuario al servicio
    this.authService.solicitarViaje(solicitud, this.authService.getUserName());
  
    console.log('Solicitud de viaje realizada:', solicitud);
    alert('Solicitud de viaje realizada!');
  }

  logout() {
    this.authService.clearAuth();
    this.isAuthenticated = false;
    this.tieneAuto = false; // Asegúrate de restablecer tieneAuto al cerrar sesión
  }
}
