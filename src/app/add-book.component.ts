import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";

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
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.errorMessage= "";
    this.bookForm = this.fb.group({
      name: ["", [Validators.required, this.validateBook]],
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

  validateBook(control: AbstractControl): { [key: string]: boolean } | null {
    if (new String(control.value).toLowerCase().includes("book")) {
      //this.errorMessage = "This is not a valid book title";
      return { "invalidBook": true };
    }
  }
}
