import { AsyncPipe, CommonModule, JsonPipe, } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, computed, effect, inject, signal, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { FoodService } from './service/food.service';
import { FoodItemsComponent } from './component/food-items/food.items.components';
import { FoodCardsComponent } from './component/food-cards/food-cards.component';
import { AddToCartComponent } from './component/add-to-cart/add.to.cart.component';
import { SearchComponent } from './component/search-bar/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, CommonModule, SearchComponent, FoodItemsComponent, FoodCardsComponent, AddToCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resto';
  food$: any;
  subtotal = signal(0);
  orderplaced: boolean = false;
  colorProp: string = 'red';
  intialId: number = 1001;
  initialValue: any = [];
  private http = inject(HttpClient);
  private service = inject(FoodService)

  private p_server = this.http.get('http://localhost:3000/api/category');
  private p_items: any = toObservable(this.service.categoryFn(this.intialId))
  categories = toSignal<any | undefined>(this.p_server, { initialValue: undefined })
  productsItems = signal([])

  itemsSignal = computed(() => this.service.getItemsSignal());

  constructor(private cd: ChangeDetectorRef) { }
  markForCheck() {
    this.cd.markForCheck();
  }



  // category: any = [
  //   { name: 'Burger', image: 'burger', categoryID: 1001 },
  //   { name: 'Pizza', image: 'pizza', categoryID: 1002 },
  //   { name: 'Sausage', image: 'saus', categoryID: 1003 },
  //   { name: 'Dessert', image: 'ice', categoryID: 1004 },
  //   { name: 'Drinks', image: 'drink', categoryID: 1005 },
  //   { name: 'Samosa', image: 'tofo', categoryID: 1006 },

  // ];
  // private productsResult = toSignal(this.foodObservale$, { initialValue: [] });

  //cart items











}





