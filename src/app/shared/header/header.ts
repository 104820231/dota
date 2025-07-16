// src/app/shared/header/header.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { Subscription } from 'rxjs'; // Para manejar la suscripción

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink es importante aquí
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {
  isAuthenticated = false; // Estado para saber si el usuario está logueado
  private userSub: Subscription | undefined; // Para la suscripción al user$

  // Inyecta el AuthService y el Router
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    // Suscríbete al user$ de AuthService para reaccionar a cambios de autenticación
    this.userSub = this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user; // true si hay un usuario, false si es null
    });
  }

  // Método para cerrar sesión
  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte para evitar fugas de memoria
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}