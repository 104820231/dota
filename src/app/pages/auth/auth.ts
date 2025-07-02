// src/app/pages/auth/auth.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- ¡IMPORTANTE! Asegúrate de que esto esté aquí
import { AuthService } from '../../services/auth';// Importa tu servicio de autenticación
import { Router } from '@angular/router'; // Necesario para la redirección

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- ¡Asegúrate de incluir FormsModule aquí!
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth implements OnInit {
  isLoginMode = true; // Controla si estamos en modo login o registro
  email = ''; // ngModel para el campo de email
  password = ''; // ngModel para el campo de password
  errorMessage: string | null = null; // Para mostrar mensajes de error al usuario
  isLoading = false; // Para mostrar un spinner o deshabilitar botones mientras carga

  // Inyecta el AuthService y el Router
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    // Opcional: Puedes hacer alguna inicialización aquí si es necesario
  }

  // Alterna entre los modos de login y registro
  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null; // Limpia errores al cambiar de modo
    this.email = ''; // Limpia campos al cambiar de modo
    this.password = '';
  }

  // Método que se llama al enviar el formulario
  async onSubmit(): Promise<void> {
    this.isLoading = true; // Inicia el estado de carga
    this.errorMessage = null; // Limpia cualquier error anterior

    // Validaciones básicas antes de enviar a Firebase
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, introduce tu correo electrónico y contraseña.';
      this.isLoading = false;
      return;
    }
    if (this.password.length < 6) { // Firebase también valida esto, pero una validación temprana ayuda
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      this.isLoading = false;
      return;
    }

    try {
      if (this.isLoginMode) {
        // Intenta iniciar sesión
        await this.authService.login(this.email, this.password);
        console.log('Inicio de sesión exitoso!');
      } else {
        // Intenta registrar un nuevo usuario
        await this.authService.register(this.email, this.password);
        console.log('Registro exitoso!');
      }
      // Si el login/registro fue exitoso, redirige a la página principal
      this.router.navigate(['/']);
    } catch (error: any) {
      // Manejo de errores específicos de Firebase
      // Los códigos de error como 'auth/user-not-found' o 'auth/wrong-password'
      // son devueltos directamente por Firebase.
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'Este correo electrónico ya está registrado.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'El formato del correo electrónico no es válido.';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'La contraseña es demasiado débil. Necesita al menos 6 caracteres.';
          break;
        case 'auth/user-not-found': // Este es para cuando intentas LOGIN con un email no registrado
          this.errorMessage = 'No se encontró un usuario con este correo electrónico.';
          break;
        case 'auth/wrong-password': // Este es para cuando intentas LOGIN con contraseña incorrecta
          this.errorMessage = 'Contraseña incorrecta.';
          break;
        default:
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
          console.error('Error de autenticación no manejado:', error); // Para depuración
          break;
      }
    } finally {
      this.isLoading = false; // Finaliza el estado de carga, haya éxito o error
    }
  }
}