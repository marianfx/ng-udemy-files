import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    let name = this.nameInput.nativeElement.value;
    let amount = this.amountInput.nativeElement.value;
    if (!name)
      return alert("Name must have value");
    if (!amount)
      return alert("Amount must have value");

    this.ingredientAdded.emit(new Ingredient(name, amount));
  }
}
