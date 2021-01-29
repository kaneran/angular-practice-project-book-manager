import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { BookDetailsComponent } from "./book-details.component";
import { ReviewsComponent } from "./reviews.component";

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    BookDetailsComponent,
    ReviewsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
