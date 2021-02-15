import { Injectable } from "@angular/core";
import { Subject, combineLatest, of, pipe, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthorService } from "./author.service";
import { GenreService } from "./genre.service";
import { IBook } from "./IBook";
import { ReviewService } from "./review.service";

@Injectable()
export class BookService {
  books$ = this.getDummyBooks();
  genres$ = this._genreSerivce.genres$;
  authors$ = this._authorService.authors$;
  reviews$ = this._reviewService.reviews$;
  selectedBookAction$ = new Subject<IBook>();
  selectedBookSource$ = this.selectedBookAction$.asObservable();

  constructor(
    private _genreSerivce: GenreService,
    private _authorService: AuthorService,
    private _reviewService: ReviewService
  ) {}

  getDummyBooks() {
    var book = this.createBook(1, "The avenegers", 1, 1);
    var book2 = this.createBook(2, "Atomic fallacy", 2, 2);
    var book3 = this.createBook(3, "Future among us", 3, 3);
    return of([book, book2, book3]).pipe(tap(book => console.log(book)));
  }

  createBook(
    bookId: number,
    name: string,
    authorId: number,
    genreId: number
  ): IBook {
    return {
      bookId: bookId,
      name: name,
      authorId: authorId,
      genreId: genreId
    } as IBook;
  }

  bookWithGenresAndAuthorsAndReviews$ = combineLatest([
    this.books$,
    this.genres$,
    this.authors$,
    this.reviews$
  ]).pipe(
    map(([books, genres, authors, reviews]) =>
      books.map(book => ({
        ...book,
        genre: genres.find(g => g.genreId === book.genreId).genreLabel,
        author: authors.find(a => a.authorId === book.authorId).authorName,
        reviews: reviews
          .filter(review => review.bookId === book.bookId)
          .map(r => r.review)
      }))
    )
  );

  checkIfBookExists(name: string) {
    let bookExists: boolean = false;
    this.books$
      .pipe(
        map(books =>
          books.filter(book => book.name === name).map(book => book.name)
        ),
        map(books => {
          if (books.length > 0) {
            bookExists = true;
          }
        })
      )
      .subscribe();
    console.log(bookExists);
    return bookExists;
  }

  getBookGenre(book: IBook) {}

  selectedBook$ = combineLatest([
    this.bookWithGenresAndAuthorsAndReviews$,
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
