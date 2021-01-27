import { ChangeDetectionStrategy, Component, VERSION } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BookService } from "./book.service";
import { IBook } from "./IBook";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  name = "Book management";
  bk = null;

  constructor(private _bookService: BookService) {}
  ngOnInit() {
    
  }
  books$ = this._bookService.bookWithGenresAndAuthors$;
  selectedBook$ = this._bookService.selectedBook$;

  bookClicked(book) {
    this.bk = book;
    console.log(book);
    this._bookService.getBook(book);
  }

  addBook() {
    console.log("Test");
  }
}
