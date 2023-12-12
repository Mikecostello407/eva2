// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private registeredUsers: any[] = []; // Almacena los usuarios registrados
  private solicitudes: any[] = []; // Lista de solicitudes de viaje

  getSolicitudes(): any[] {
    return this.solicitudes;
  }

  solicitarViaje(solicitud: any, nombreUsuario: string): void {
    // Agrega el nombre de usuario a la solicitud
    solicitud.nombreUsuario = nombreUsuario;
    this.solicitudes.push(solicitud);
    this.dataService.guardarSolicitudes(this.solicitudes);
  }

  constructor(private router: Router, private dataService: DataService) {
    // Intenta cargar usuarios registrados al iniciar el servicio
    const usuariosRegistrados = this.dataService.obtenerDatosUsuarios();
    if (usuariosRegistrados) {
      this.registeredUsers = usuariosRegistrados;
    }
  }

  tieneAuto(): boolean {
    // Devuelve true si el usuario actual tiene auto, de lo contrario, devuelve false
    return this.isAuthenticated ? this.registeredUsers[0]?.tieneAuto || false : false;
  }

  login(user: string, password: string): boolean {
    // Verifica si el usuario y la contraseña coinciden con algún usuario registrado
    const usuarioEncontrado = this.registeredUsers.find(
      (u) => u.username === user && u.password === password
    );
  
    if (usuarioEncontrado) {
      this.isAuthenticated = true;
  
      // Mueve el usuario encontrado al principio del array
      const usuarioIndex = this.registeredUsers.indexOf(usuarioEncontrado);
      if (usuarioIndex !== -1) {
        this.registeredUsers.unshift(this.registeredUsers.splice(usuarioIndex, 1)[0]);
      }
  
      return true;
    } else {
      console.log('Datos incorrectos');
      return false;
    }
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }

  resetUserAndPass(newUsername: string, newPassword: string): void {
    // Verifica si el usuario está autenticado antes de permitir el restablecimiento
    if (this.isAuthenticated) {
      // Actualiza el usuario actual solo para demostración (puede cambiar según tus necesidades)
      this.registeredUsers[0].username = newUsername;
      this.registeredUsers[0].password = newPassword;
  
      // También podrías agregar lógica para actualizar la persistencia de datos si es necesario
      this.dataService.guardarDatosUsuarios(this.registeredUsers);
    } else {
      console.log('Usuario no autenticado. No se permitió el restablecimiento.');
    }
  }

  getUserName(): string {
    // Devuelve el nombre de usuario actual si está autenticado, de lo contrario, cadena vacía
    return this.isAuthenticated ? this.registeredUsers[0]?.username || '' : '';
  }

  async registrarUsuario(data: any): Promise<boolean> {
    // Verifica si ya existe un usuario con el mismo nombre
    const usuarioExistente = this.registeredUsers.find((u) => u.username === data.username);
  
    if (usuarioExistente) {
      console.log('Ya existe un usuario con ese nombre.');
      return false; // Indica que no se pudo registrar el usuario
    }
  
    // Si no hay un usuario con el mismo nombre, procede con el registro
    const datosUsuario = {
      username: data.username,
      password: data.password,
      tieneAuto: data.tieneAuto, // Agrega la información sobre si tiene auto al objeto
      // Otros campos de registro
    };
  
    // Agrega el nuevo usuario a la lista de usuarios registrados
    this.registeredUsers.push(datosUsuario);
  
    // Mueve el usuario más reciente al principio del array
    this.registeredUsers.unshift(this.registeredUsers.pop());
  
    // Almacena los datos de usuarios registrados en la persistencia de datos
    this.dataService.guardarDatosUsuarios(this.registeredUsers);
  
    console.log('Usuario registrado con éxito.');
    return true; // Indica que el registro fue exitoso
  }
  clearAuth(): void {
    this.isAuthenticated = false;
    this.tieneAuto = () => false;
    this.router.navigate(['/home']);
  }

}
