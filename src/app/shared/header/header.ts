import { Component, Inject, PLATFORM_ID } from '@angular/core'; // <-- Importar Inject y PLATFORM_ID
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common'; // <-- Importar isPlatformBrowser y DOCUMENT
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'] // styleUrl se convierte en styleUrls (es un array)
})
export class Header {
  // Constructor: Se ejecuta cuando el componente se inicializa.
  // Aquí inyectamos servicios para saber si estamos en el navegador y para acceder al DOM de forma segura.
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, // Nos dice si la app está en navegador o servidor
    @Inject(DOCUMENT) private document: Document // Inyecta el objeto 'document' de forma segura
  ) {
    // Solo añadimos el event listener si estamos en el navegador (no en el servidor)
    if (isPlatformBrowser(this.platformId)) {
      // Esto cerrará el menú desplegable si el usuario hace clic fuera de él.
      this.document.addEventListener('click', (event) => {
        const dropdowns = this.document.querySelectorAll('.dropdown.show');
        dropdowns.forEach(dropdown => {
          if (!dropdown.contains(event.target as Node)) {
            dropdown.classList.remove('show');
          }
        });
      });
    }
  }

  // Método para alternar la visibilidad del menú desplegable de "JUEGO"
  toggleDropdown(event: Event) {
    event.stopPropagation(); // Evita que el clic en el "JUEGO" se propague y cierre el menú de inmediato
    const dropdownElement = (event.currentTarget as HTMLElement).closest('.dropdown');
    if (dropdownElement) {
      dropdownElement.classList.toggle('show'); // Añade o quita la clase 'show' para mostrar/ocultar
    }
  }
}