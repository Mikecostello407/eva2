import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      tieneAuto: [false], // Establecemos el valor por defecto
    });
  }

  ngOnInit() {}

  async registrarUsuario(): Promise<void> {
    const registroAlert = await this.alertController.create({
      header: 'Registro de Usuario',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nombre de usuario',
          value: this.registroForm.value.username, // Precargamos el valor del formulario
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña',
          value: this.registroForm.value.password, // Precargamos el valor del formulario
        },
        {
          name: 'tieneAuto', // Usamos el mismo nombre para la variable y el input
          type: 'checkbox',
          label: '¿Tiene auto?',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Registrar',
          handler: async (data) => {
            console.log(data);
            if (data.username && data.password) {
              const isAuthenticated = await this.authService.registrarUsuario({
                ...data,
                tieneAuto: data.tieneAuto === 'on', // Convertir a booleano
              });
          
              if (isAuthenticated) {
                alert('Has registrado tu cuenta!');
              } else {
                alert('No se puede autenticar');
              }
            } else {
              alert('Datos de registro incompletos');
            }
          },          
        },
      ],
    });

    await registroAlert.present();
  }
}