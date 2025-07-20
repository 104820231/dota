// src/app/pages/not-found.ts
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const img = document.querySelector('img');
    let lFollowX = 0,
      lFollowY = 0,
      x = 0,
      y = 0,
      friction = 1 / 30;

    function animate() {
      x += (lFollowX - x) * friction;
      y += (lFollowY - y) * friction;

      const translate = `translate(${x}px, ${y}px) scale(1.1)`;
      if (img) {
        (img as HTMLElement).style.transform = translate;
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
      const lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
      const lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
      lFollowX = (20 * lMouseX) / 100;
      lFollowY = (10 * lMouseY) / 100;
    });

    animate();
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
