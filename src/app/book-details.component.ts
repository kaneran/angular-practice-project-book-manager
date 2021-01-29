import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { BookService } from "./book.service";

@Component({
  selector: "book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input()
  selectedBook$: Observable<{
    genre: string;
    author: string;
    reviews: string[];
    bookId: number;
    name: string;
    authorId: number;
    genreId: number;
  }>;
}
