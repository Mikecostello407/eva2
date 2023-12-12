import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async showloginalert() {
    const showalert = await this.alertController.create({
      header: 'Inicia Sesion',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nombre de usuario'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Restablecer usuario y contraseña',
          handler: () => {
            this.resetUserAndPass();
          }
        },
        {
          text: 'Iniciar Sesion',
          handler: async (data) => {
            const isAutenticated = await this.authService.login(data.username, data.password);

            if (isAutenticated) {
              
              this.router.navigate(['/conductores']);
            } else {
              alert("No se puede autenticar");
            }
          }
        }
      ]
    });

    await showalert.present();
  }

  async resetUserAndPass() {
    if (this.authService.isAuth()) {
      const resetAlert = await this.alertController.create({
        header: 'Restablecer Usuario y Contraseña',
        message: 'Por favor, ingrese su nuevo nombre de usuario y contraseña.',
        inputs: [
          {
            name: 'username',
            type: 'text',
            placeholder: 'Nuevo Nombre de Usuario'
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Nueva Contraseña'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Restablecer usuario y contraseña',
            handler: async (data) => {
              if (data.username && data.password) {
                this.authService.resetUserAndPass(data.username, data.password);
                alert("Usuario y contraseña restablecidos con éxito.");
              } else {
                alert("Datos incorrectos. Por favor, complete todos los campos.");
              }
            }
          }
        ]
      });
  
      await resetAlert.present();
    } else {
      alert("No puedes restablecer la contraseña si no estás autenticado.");
      // Puedes redirigir al usuario a donde desees en este punto, por ejemplo:
      this.router.navigate(['/home']);
    }
  }
};