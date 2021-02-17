import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthorService } from "./author.service";
import { BookService } from "./book.service";
import { GenreService } from "./genre.service";
import { IGenre } from "./IGenre";

@Component({
  selector: "hello",
  templateUrl: "./add-book.component.html",
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class AddBookComponent implements OnInit {
  @Input() name: string;
  bookForm: FormGroup;
  errorMessage: string;
  genres$: Observable<string[]>;
  authors$: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private _bookService: BookService,
    private _genreService: GenreService,
    private _authorService: AuthorService
  ) {}
  ngOnInit(): void {
    this.errorMessage = "";
    this.bookForm = this.fb.group({
      name: ["", [Validators.required, this.checkBookExists()]],
      author: "",
      genre: "",
      rating: ""
    });
    this.genres$ = this._genreService.getGenres()
    this.authors$ = this._authorService.getAuthorNames();
  }

  validateFormControl(control: AbstractControl): { [key: string]: any } | null {
    if (control.touched || (control.dirty && !control.valid)) {
      this.errorMessage = "This is not a valid value";
      return { key: "Not valid" };
    }
  }

  checkBookExists(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let bookExists = this._bookService.checkIfBookExists(control.value);
      if (bookExists) {
        this.errorMessage = "This book already exists!";
        return { invalidBook: true };
      }
    };
  }
}
