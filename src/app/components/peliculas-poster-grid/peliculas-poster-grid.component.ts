import { Component, Input, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie, NowPlaying } from '../../interfaces/now-paying';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css'],
})
export class PeliculasPosterGridComponent implements OnInit {
  @Input() movies: Movie[] = [];

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onMovieClick(movie: Movie): void {
    this.router.navigate(['/pelicula', movie.id]);
  }
}
