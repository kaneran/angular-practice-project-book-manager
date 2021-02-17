import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IAuthor } from "./IAuthor";
import { IGenre } from "./IGenre";

@Injectable({
  providedIn: "root"
})
export class AuthorService {
  authors$ = this.getDummyAuthors();
  getDummyAuthors() {
    var author = this.createAuthor(1, "John Petters");
    var author2 = this.createAuthor(2, "Jordan Payton");
    var author3 = this.createAuthor(3, "Bryan Smuggles");
    return of([author, author2, author3]).pipe(
      tap(author => console.log(author))
    );
  }

  getAuthorNames() {
    return this.authors$.pipe(
      map(authors => authors.map(author => author.authorName))
    );
  }

  createAuthor(authorId: number, authorName: string): IAuthor {
    return { authorId: authorId, authorName: authorName };
  }
}
