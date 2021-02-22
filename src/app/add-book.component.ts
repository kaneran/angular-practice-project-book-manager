import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
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
  nameErrorMessage: string;
  ratingErrorMessage: string;
  genres$: Observable<string[]>;
  authors$: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private _bookService: BookService,
    private _genreService: GenreService,
    private _authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.nameErrorMessage = "";
    this.ratingErrorMessage = "";
    this.bookForm = this.fb.group({
      name: ["", [Validators.required, this.checkBookExists()]],
      genres: this.fb.array([this.buildGenre()]),
      authors: this.fb.array([this.buildAuthor()]),
      rating: ["0", this.inRange(1, 5)]
    });
    this.genres$ = this._genreService.getGenres();
    this.authors$ = this._authorService.getAuthorNames();
    console.log(this.bookForm);
  }

  addGenre() {
    this.genres.push(this.buildGenre());
  }

  addAuthor() {
    this.authors.push(this.buildAuthor());
  }

  buildGenre(): FormControl {
    return new FormControl("");
  }

  buildAuthor(): FormControl {
    return new FormControl("");
  }

  get genres(): FormArray {
    return <FormArray>this.bookForm.get("genres");
  }

  get authors(): FormArray {
    return <FormArray>this.bookForm.get("authors");
  }

  validateFormControl(control: AbstractControl): { [key: string]: any } | null {
    if (control.touched || (control.dirty && !control.valid)) {
      this.nameErrorMessage = "This is not a valid value";
      return { key: "Not valid" };
    }
  }

  checkBookExists(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let bookExists = this._bookService.checkIfBookExists(control.value);
      if (bookExists) {
        this.nameErrorMessage = "This book already exists!";
        return { invalidBook: true };
      }
    };
  }

  inRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value > max || control.value < min) {
        this.ratingErrorMessage = `Please enter a rating between ${min} and ${max}`;
        return { invalidRating: true };
      }
    };
  }
}
