// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private keyUsuarios = 'miAppUsuarios'; // Clave para los datos de usuarios
  private keySolicitudes = 'miAppSolicitudes'; // Clave para las solicitudes de viaje

  private datosUsuariosSubject = new BehaviorSubject<any>(null);
  datosUsuarios$ = this.datosUsuariosSubject.asObservable();

  private solicitudesSubject = new BehaviorSubject<any>(null);
  solicitudes$ = this.solicitudesSubject.asObservable();

  constructor() {
    // Intenta cargar datos de usuarios almacenados al iniciar el servicio
    const datosUsuariosAlmacenados = localStorage.getItem(this.keyUsuarios);
    if (datosUsuariosAlmacenados) {
      this.datosUsuariosSubject.next(JSON.parse(datosUsuariosAlmacenados));
    }

    // Intenta cargar solicitudes almacenadas al iniciar el servicio
    const solicitudesAlmacenadas = localStorage.getItem(this.keySolicitudes);
    if (solicitudesAlmacenadas) {
      this.solicitudesSubject.next(JSON.parse(solicitudesAlmacenadas));
    }
  }

  // Funciones relacionadas con los datos de usuarios

  guardarDatosUsuarios(datos: any): void {
    localStorage.setItem(this.keyUsuarios, JSON.stringify(datos));
    this.datosUsuariosSubject.next(datos);
  }

  obtenerDatosUsuarios(): any {
    const datosUsuariosString = localStorage.getItem(this.keyUsuarios);
    try {
      return datosUsuariosString ? JSON.parse(datosUsuariosString) : null;
    } catch (error) {
      console.error('Error al analizar datos de usuarios almacenados:', error);
      return null;
    }
  }

  borrarDatosUsuarios(): void {
    localStorage.removeItem(this.keyUsuarios);
    this.datosUsuariosSubject.next(null);
  }

  // Funciones relacionadas con las solicitudes de viaje

  guardarSolicitudes(solicitudes: any): void {
    localStorage.setItem(this.keySolicitudes, JSON.stringify(solicitudes));
    this.solicitudesSubject.next(solicitudes);
  }

  obtenerSolicitudes(): any {
    const solicitudesString = localStorage.getItem(this.keySolicitudes);
    try {
      return solicitudesString ? JSON.parse(solicitudesString) : null;
    } catch (error) {
      console.error('Error al analizar solicitudes almacenadas:', error);
      return null;
    }
  }

  borrarSolicitudes(): void {
    localStorage.removeItem(this.keySolicitudes);
    this.solicitudesSubject.next(null);
  }
}
