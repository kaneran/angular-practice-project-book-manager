import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, of, pipe } from "rxjs";
import { map, tap } from "rxjs/operators";
import { GenreService } from "./genre.service";
import { IBook } from "./IBook";

@Injectable({
  providedIn: "root",
})
export class BookService {
  books$ = this.getDummyBooks();
  genres$ = this._genreSerivce.genres$;
  constructor(private _genreSerivce: GenreService) {}

  getDummyBooks() {
    var book = this.createBook("The avenegers", 1, 1, 2);
    var book2 = this.createBook("Atomic fallacy", 2, 1, 4.5);
    var book3 = this.createBook("Future among us", 3, 2, 4);
    return of([book, book2, book3]).pipe(tap((book) => console.log(book)));
  }

  createBook(
    name: string,
    authorId: number,
    genreId: number,
    ratingId: number
  ): IBook {
    return { name: name, authorId: authorId, genreId: genreId };
  }

  bookWithGenres$ = combineLatest([this.books$, this.genres$]).pipe(
    map(([books, genres]) =>
      books.map(
        (book) =>
          ({
            ...book,
            genre: genres.find((g) => g.genreId === book.genreId).genreLabel,
          } as IBook)
      )
    )
  );

  getBookGenre(book: IBook) {}
}
