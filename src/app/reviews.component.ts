import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent {
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
