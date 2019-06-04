import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    let name = this.nameInput.nativeElement.value;
    let amount = this.amountInput.nativeElement.value;
    if (!name)
      return alert("Name must have value");
    if (!amount)
      return alert("Amount must have value");

    const newIngredient = new Ingredient(name, amount);
    this.slService.addIngredient(newIngredient);
  }
}
