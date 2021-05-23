import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-details';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public movieDetails: MovieDetails;
  public cast: Cast[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    combineLatest([
      this.peliculasService.getDetallePelicla(id),
      this.peliculasService.getCast(id),
    ]).subscribe(([pelicula, cast]) => {
      if (!pelicula) {
        this.router.navigateByUrl('/');
        return;
      }
      this.movieDetails = pelicula;
      this.cast = cast.filter((actor) => actor.profile_path !== null);
    });
  }

  onRegresar(): void {
    this.location.back();
  }
}
