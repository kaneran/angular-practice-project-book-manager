import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IGenre } from './IGenre';


@Injectable({
  providedIn: 'root',
})

export class GenreService{
  genres$ = this.getDummyGenres();
  getDummyGenres(){
    var genre = this.createGenre(1, "Crime");
    var genre2 = this.createGenre(2, "Poetry");
    var genre3 = this.createGenre(3, "Education");
    return  of([genre,genre2,genre3]).pipe(tap(genre => console.log(genre)));
  }

  createGenre(genreId: number, genreLabel: string): IGenre{
    return {genreId:genreId, genreLabel:genreLabel}
  }
}
