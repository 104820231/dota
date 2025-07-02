// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth); // Inyecta el servicio de Auth de Firebase
  private router: Router = inject(Router); // Inyecta el Router de Angular

  // Observable para obtener el estado del usuario (logueado o no)
  user$: Observable<User | null>;

  constructor() {
    // Inicializa user$ para emitir el estado de autenticación de Firebase
    this.user$ = authState(this.auth);
  }

  /**
   * Registra un nuevo usuario con email y contraseña.
   * @param email El email del usuario.
   * @param password La contraseña del usuario.
   * @returns Una Promesa que resuelve cuando el registro es exitoso.
   */
  async register(email: string, password: string): Promise<any> {
    try {
      // Llama a la función de Firebase para crear usuario
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado con éxito:', userCredential.user);
      return userCredential; // Devuelve las credenciales del usuario
    } catch (error: any) {
      console.error('Error al registrar usuario:', error.code, error.message);
      throw error; // Propaga el error para que el componente pueda manejarlo
    }
  }

  /**
   * Inicia sesión con email y contraseña.
   * @param email El email del usuario.
   * @param password La contraseña del usuario.
   * @returns Una Promesa que resuelve cuando el inicio de sesión es exitoso.
   */
  async login(email: string, password: string): Promise<any> {
    try {
      // Llama a la función de Firebase para iniciar sesión
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario ha iniciado sesión con éxito:', userCredential.user);
      return userCredential;
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.code, error.message);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Sesión cerrada con éxito.');
      // Redirige al usuario a la página de autenticación después de cerrar sesión
      this.router.navigate(['/auth']);
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.code, error.message);
      throw error;
    }
  }
}