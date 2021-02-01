import { ChangeDetectionStrategy, Component, VERSION } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BookService } from "./book.service";
import { IBook } from "./IBook";

@Component({
  selector: "my-app",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  name = "Book management";

  constructor(private _bookService: BookService) {}
  ngOnInit() {}
  books$ = this._bookService.bookWithGenresAndAuthorsAndReviews$;
  selectedBook$ = this._bookService.selectedBook$;

  bookClicked(book) {
    this._bookService.getBook(book);
  }

  addBook() {
    console.log("Test");
  }
}
