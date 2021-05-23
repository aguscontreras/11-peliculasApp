import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/now-paying';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  public movies: Movie[] = [];
  public texto: string;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.texto = params.texto;

      this.peliculasService.buscarPelicula(params.texto).subscribe({
        next: (movies) => {
          console.log(movies);
          this.movies = movies;
        },
      });
    });
  }
}
