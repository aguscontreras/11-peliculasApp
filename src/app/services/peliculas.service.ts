import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NowPlaying, Movie } from '../interfaces/now-paying';
import { tap, map, catchError } from 'rxjs/operators';
import { MovieDetails } from '../interfaces/movie-details';
import { Credits, Cast } from '../interfaces/credits';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage: number = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: '32f52e0535ec14e50eb1741fd5231d26',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http
      .get<NowPlaying>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((nowPlaying) => nowPlaying.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPelicula(query: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query, include_adult: 'true' };

    return this.http
      .get<NowPlaying>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((resp) => resp.results));
  }

  getDetallePelicla(id: string): Observable<MovieDetails> {
    return this.http
      .get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http
      .get<Credits>(`${this.baseUrl}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }

  resetCarteleraPage(): void {
    this.carteleraPage = 1;
  }
}
