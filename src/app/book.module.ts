import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddBookComponent } from "./add-book.component";
import { BookDetailsComponent } from "./book-details.component";
import { HomeComponent } from "./home.component";
import { ReviewsComponent } from "./reviews.component";

@NgModule({
  declarations: [
    HomeComponent,
    AddBookComponent,
    BookDetailsComponent,
    ReviewsComponent
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class BookModule {}
