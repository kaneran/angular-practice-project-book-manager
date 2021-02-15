import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { tap } from "rxjs/operators";
import { BookService } from "./book.service";

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
  constructor(private fb: FormBuilder, private _bookService: BookService) {}
  ngOnInit(): void {
    this.errorMessage = "";
    this.bookForm = this.fb.group({
      name: ["", [Validators.required, this.checkBookExists()]],
      author: "",
      genre: "",
      rating: ""
    });
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
