// src/app/pages/auth/auth.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { filter } from 'rxjs/operators'; // Importa 'filter'
import { User } from '@angular/fire/auth'; // Importa User de Firebase Auth

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'], // Usamos 'styleUrls' como en tu configuración original
})
export class Auth implements OnInit { // Mantengo 'Auth' como el nombre de tu clase
  // Propiedades para el manejo del formulario de login/registro
  isLoginMode: boolean = true; // Controla qué formulario se muestra en escritorio (true = login, false = register)
  isLoading: boolean = false; // Para mostrar un spinner durante la carga
  errorMessage: string | null = null; // Para mostrar mensajes de error

  // Variables para el formulario de login
  email: string = '';
  password: string = '';

  // Variables para el formulario de registro
  nombre: string = '';
  registroEmail: string = '';
  registroPassword: string = '';

  // Variable para controlar la visibilidad de la contraseña
  mostrarPassword = false;

  // Propiedad para el toggle de vistas en móvil
  mobileView: 'login' | 'register' = 'login';

  // Control del nombre en registro para el mensaje de bienvenida
  primeraPalabra = ''; // Para el mensaje de bienvenida "¡Hola, [nombre]!"

  private authService: AuthService = inject(AuthService); // Inyecta el AuthService
  private router: Router = inject(Router); // Inyecta el Router

  constructor() {}

  ngOnInit() {
    // Suscribirse al estado de autenticación para redirigir si el usuario ya está logueado
    // Usamos 'filter(user => user !== null)' para que solo reaccione cuando hay un usuario.
    this.authService.user$.pipe(
      filter(user => user !== null) // Solo procede si hay un usuario logueado
    ).subscribe(() => {
      if (!this.isLoading) { // Evita redireccionar si estamos en medio de un proceso de login/registro
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Alterna entre el modo de inicio de sesión y registro para la vista de escritorio.
   * También resetea los mensajes de error y las variables de los formularios.
   */
  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null; // Limpiar errores al cambiar de modo
    // Limpiar campos al cambiar de modo
    this.email = '';
    this.password = '';
    this.nombre = '';
    this.registroEmail = '';
    this.registroPassword = '';
    this.primeraPalabra = ''; // Limpiar también la primera palabra
  }

  /**
   * Intenta iniciar sesión con email y contraseña.
   */
  async login(): Promise<void> {
    this.isLoading = true; // Activar spinner
    this.errorMessage = null; // Limpiar cualquier error anterior

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese un email y contraseña válidos.';
      this.isLoading = false; // Desactivar spinner
      return;
    }
    try {
      await this.authService.login(this.email, this.password);
      console.log('Login exitoso');
      // La suscripción en ngOnInit ya maneja la redirección
    } catch (error: any) {
      console.error('Error en login:', error);
      this.handleAuthError(error);
    } finally {
      this.isLoading = false; // Desactivar spinner
    }
  }

  /**
   * Intenta registrar un nuevo usuario con email y contraseña.
   */
  async register(): Promise<void> {
    this.isLoading = true; // Activar spinner
    this.errorMessage = null; // Limpiar cualquier error anterior

    if (!this.nombre || !this.registroEmail || !this.registroPassword) {
      this.errorMessage = 'Por favor complete todos los campos requeridos.';
      this.isLoading = false; // Desactivar spinner
      return;
    }
    try {
      // Tu servicio de login actual no usa el nombre, por lo que lo omito aquí.
      // Si necesitas guardar el nombre, tu authService.register debería aceptarlo.
      await this.authService.register(this.registroEmail, this.registroPassword);
      console.log('Registro exitoso');
      this.onSwitchMode(); // Cambiar al formulario de login después del registro exitoso
    } catch (error: any) {
      console.error('Error en registro:', error);
      this.handleAuthError(error);
    } finally {
      this.isLoading = false; // Desactivar spinner
    }
  }

  /**
   * Maneja el inicio de sesión con Google.
   */
  async loginWithGoogle(): Promise<void> {
    this.isLoading = true; // Activar spinner
    this.errorMessage = null;
    try {
      await this.authService.signInWithGoogle(); // Llama a tu método signInWithGoogle
      console.log('Login con Google exitoso');
      // La suscripción en ngOnInit ya maneja la redirección
    } catch (error: any) {
      console.error('Error en login con Google:', error);
      this.handleAuthError(error);
    } finally {
      this.isLoading = false; // Desactivar spinner
    }
  }

  /**
   * Maneja el inicio de sesión con Facebook.
   */
  async loginWithFacebook(): Promise<void> {
    this.isLoading = true; // Activar spinner
    this.errorMessage = null;
    try {
      // Asegúrate de que este método exista en tu AuthService
      await this.authService.loginFacebook(); // Asumo que este método existe
      console.log('Login con Facebook exitoso');
      // La suscripción en ngOnInit ya maneja la redirección
    } catch (error: any) {
      console.error('Error en login con Facebook:', error);
      this.errorMessage = 'Error al iniciar sesión con Facebook. Asegúrate de que el método loginFacebook esté implementado en AuthService.';
      this.handleAuthError(error);
    } finally {
      this.isLoading = false; // Desactivar spinner
    }
  }

  /**
   * Extrae la primera palabra del campo de nombre en el registro.
   */
  filtrarPrimeraPalabra(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    this.primeraPalabra = valor.split(' ')[0]; // Solo la primera palabra
  }

  /**
   * Alterna la visibilidad de la contraseña.
   */
  togglePasswordVisibility(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  /**
   * Maneja los mensajes de error de autenticación.
   * @param error El objeto de error de Firebase.
   */
  private handleAuthError(error: any): void {
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.errorMessage = 'El formato del correo electrónico no es válido.';
          break;
        case 'auth/user-disabled':
          this.errorMessage = 'Esta cuenta de usuario ha sido deshabilitada.';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'No existe usuario con este correo electrónico.';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'La contraseña es incorrecta.';
          break;
        case 'auth/email-already-in-use':
          this.errorMessage = 'Este correo electrónico ya está en uso.';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
          break;
        case 'auth/popup-closed-by-user':
          this.errorMessage = 'La ventana de inicio de sesión de Google/Facebook fue cerrada.';
          break;
        default:
          this.errorMessage = 'Error de autenticación: ' + error.message;
          break;
      }
    } else {
      this.errorMessage = 'Ocurrió un error inesperado: ' + error;
    }
  }
}
