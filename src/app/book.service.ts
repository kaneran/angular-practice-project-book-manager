import { Injectable } from "@angular/core";
import { Subject, combineLatest, of, pipe, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthorService } from "./author.service";
import { GenreService } from "./genre.service";
import { IBook } from "./IBook";

@Injectable({
  providedIn: "root"
})
export class BookService {
  books$ = this.getDummyBooks();
  genres$ = this._genreSerivce.genres$;
  authors$ = this._authorService.authors$;
  selectedBookAction$ = new Subject<IBook>();
  selectedBookSource$ = this.selectedBookAction$.asObservable();

  constructor(
    private _genreSerivce: GenreService,
    private _authorService: AuthorService
  ) {}

  getDummyBooks() {
    var book = this.createBook("The avenegers", 1, 1, 2);
    var book2 = this.createBook("Atomic fallacy", 2, 2, 4.5);
    var book3 = this.createBook("Future among us", 3, 3, 4);
    return of([book, book2, book3]).pipe(tap(book => console.log(book)));
  }

  createBook(
    name: string,
    authorId: number,
    genreId: number,
    ratingId: number
  ): IBook {
    return { name: name, authorId: authorId, genreId: genreId };
  }

  bookWithGenresAndAuthors$ = combineLatest([
    this.books$,
    this.genres$,
    this.authors$
  ]).pipe(
    map(([books, genres, authors]) =>
      books.map(book => ({
        ...book,
        genre: genres.find(g => g.genreId === book.genreId).genreLabel,
        author: authors.find(a => a.authorId === book.authorId).authorName
      }))
    )
  );

  getBookGenre(book: IBook) {}

  selectedBook$ = combineLatest([
    this.bookWithGenresAndAuthors$,
    this.selectedBookSource$
  ]).pipe(
    map(([books, selectedBook]) =>
      books.find(book => book.name === selectedBook.name)
    ),
    tap(book => console.log(book))
  );

  getBook(book: IBook) {
    this.selectedBookAction$.next(book);
  }
  addBook() {}
}
