import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { IGenre } from "./IGenre";
import { IReview } from "./IReview";

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  reviews$ = this.getDummyReviews();
  getDummyReviews() {
    var review = this.createReview(1, 1, 4.5, "It was pretty good");
    var review2 = this.createReview(2, 1, 4.2, "Not bad actually");
    var review3 = this.createReview(3, 1, 3.5, "An absolute page turner");
    var review4 = this.createReview(1, 2, 4.1, "It was pretty average");
    var review5 = this.createReview(2, 2, 4.2, "Boring, boring and boring");
    var review6 = this.createReview(
      3,
      2,
      3.5,
      "Despite what others said, I enjoyed it"
    );
    var review7 = this.createReview(1, 3, 5, "It was pretty spectacular");
    var review8 = this.createReview(2, 3, 5, "Best book I've ever read");
    var review9 = this.createReview(3, 3, 4.9, "This author is talented!");
    return of([
      review,
      review2,
      review3,
      review4,
      review5,
      review6,
      review7,
      review8,
      review9
    ]).pipe();
  }

  createReview(
    reviewId: number,
    bookId: number,
    rating: number,
    review: string
  ): IReview {
    return {
      reviewId: reviewId,
      bookId: bookId,
      rating: rating,
      review: review
    };
  }
}
