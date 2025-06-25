import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
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

  toggleDropdown(event: Event) {
    event.stopPropagation();
    const dropdownElement = (event.currentTarget as HTMLElement).closest('.dropdown');
    if (dropdownElement) {
      dropdownElement.classList.toggle('show');
    }
  }
}