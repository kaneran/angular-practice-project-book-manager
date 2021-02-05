import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { AddBookComponent } from "./add-book.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  { path: "app-component", component: HomeComponent },
  { path: "hello-component", component: AddBookComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
