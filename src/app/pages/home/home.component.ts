import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/now-paying';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.peliculasService.cargando) {
        return;
      }

      this.peliculasService.getCartelera().subscribe({
        next: (respuesta) => {
          this.movies.push(...respuesta);
        },
      });
    }
  }

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.getNowPlaying();
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }

  getNowPlaying() {
    this.peliculasService.getCartelera().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.moviesSlideshow = movies;
      },
    });
  }
}
