import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { BookDetailsComponent } from "./book-details.component";
import { ReviewsComponent } from "./reviews.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HelloComponent,
    BookDetailsComponent,
    ReviewsComponent,
    HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
