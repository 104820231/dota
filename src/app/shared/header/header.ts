// src/app/components/header/header.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  private authService: AuthService = inject(AuthService);

  user: User | null = null;
  private userSubscription: Subscription | undefined;

  constructor() {
    console.log('HeaderComponent: Constructor ejecutado.');
  }

  ngOnInit(): void {
    console.log('HeaderComponent: ngOnInit ejecutado.');
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      console.log('HeaderComponent: Estado de usuario actualizado:', user ? user.email : 'No logueado');
    });
  }

  /**
   * Maneja el clic en el botón "INICIAR SESIÓN".
   */
  async onLoginClick(): Promise<void> {
    console.log('HeaderComponent: onLoginClick llamado.');
    try {
      await this.authService.signInWithGoogle();
      console.log('HeaderComponent: Inicio de sesión exitoso');
    } catch (error) {
      console.error('HeaderComponent: Error al iniciar sesión:', error);
    }
  }

  /**
   * Maneja el clic en el botón "CERRAR SESIÓN".
   */
  async onLogoutClick(): Promise<void> {
    console.log('HeaderComponent: onLogoutClick llamado.');
    try {
      await this.authService.logout();
      console.log('HeaderComponent: Sesión cerrada exitosamente');
    } catch (error) {
      console.error('HeaderComponent: Error al cerrar sesión:', error);
    }
  }

  ngOnDestroy(): void {
    console.log('HeaderComponent: ngOnDestroy ejecutado.');
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
