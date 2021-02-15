import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home.component";
import { BookModule } from "./book.module";
import { BookService } from "./book.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BookModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [BookService]
})
export class AppModule {}
