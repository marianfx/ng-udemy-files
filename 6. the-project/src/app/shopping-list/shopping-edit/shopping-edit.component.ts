import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import { AppStateModel } from '../store/shopping-list.reducer';
import { Store } from '@ngrx/store';
import { AddIngredientAction, UpdateIngredientAction, DeleteIngredientAction } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  startedEditSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild("f") theForm: NgForm;

  constructor(private slService: ShoppingListService,
    private store: Store<AppStateModel>) { }

  ngOnInit() {
    this.startedEditSubscription = this.slService.startedEditing.subscribe((i: number) => {
      this.editedItemIndex = i;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(i);
      this.theForm.setValue(this.editedItem);
    });
  }

  onSubmit(form: NgForm) {
    let name = form.value["name"];
    let amount = form.value["amount"];
    if (!name) {
      return alert("Name must have value");
    }
    if (!amount) {
      return alert("Amount must have value");
    }

    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredientAction({ index: this.editedItemIndex, ingredient: newIngredient}));
    } else {
      this.store.dispatch(new AddIngredientAction(newIngredient));
    }

    this.editMode = false;
    this.theForm.reset();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredientAction({ index: this.editedItemIndex}));
    this.onClear();
  }

  onClear() {
    this.theForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.startedEditSubscription.unsubscribe();
  }
}
