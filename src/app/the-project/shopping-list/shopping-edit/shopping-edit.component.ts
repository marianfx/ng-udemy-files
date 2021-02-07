import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  startedEditSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  @ViewChild("f") theForm: NgForm;

  constructor(private store: Store<fromApp.AppStateModel>) { }

  ngOnInit() {
    this.startedEditSubscription = this.store.select('shoppingList').subscribe((state: fromShoppingList.ShoppingListStateModel) => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = state.editedIngredient;
        this.theForm.setValue(this.editedItem);
      } else {
        this.editMode = false;
      }
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
      this.store.dispatch(new shoppingListActions.UpdateIngredientAction({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredientAction(newIngredient));
    }

    this.editMode = false;
    this.theForm.reset();
  }

  onDelete() {
    this.store.dispatch(new shoppingListActions.DeleteIngredientAction(null));
    this.onClear();
  }

  onClear() {
    this.theForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEditAction(null));
  }

  ngOnDestroy() {
    this.startedEditSubscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEditAction(null));
  }
}
