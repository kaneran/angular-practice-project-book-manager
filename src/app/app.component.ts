import { Component, VERSION } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BookService } from "./book.service";
import { IBook } from "./IBook";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  name = "Book management";
  genre = null;
  books$: Observable<IBook[]>;

  constructor(private _bookService: BookService) {}
  ngOnInit() {
    this.books$ = this._bookService.bookWithGenres$;
  }

  bookClicked(book) {
    this.genre = book.genre;
    console.log(book);
  }
}
