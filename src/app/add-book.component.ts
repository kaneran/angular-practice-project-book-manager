import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  templateUrl: "./add-book.component.html",
  styles: [`h1 { font-family: Lato; }`]
})
export class AddBookComponent  {
  @Input() name: string;
}
