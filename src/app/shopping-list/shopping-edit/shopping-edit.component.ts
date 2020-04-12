import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscriptionIngrediateToEdit: Subscription;
  editMode = false;
 
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
   this.subscriptionIngrediateToEdit = this.shoppingListService.ingrediateToEdit.subscribe(ingredient => {
      this.form.setValue({ 'name': ingredient.name, 'amount': ingredient.amount });
      this.editMode = true;
    })
  }

  ngOnDestroy() {
    this.subscriptionIngrediateToEdit.unsubscribe();
  }

  onAddBtnClick() {
    const value = this.form.value;
    this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    this.onClear();
  }

  onDelete() {}

  onClear() {
    this.editMode = false;
    this.form.resetForm();
  }
}
