import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { FoodService } from '../../service/food.service';

@Component({
    selector: 'app-food-card',
    standalone: true,
    imports: [JsonPipe, CommonModule],
    templateUrl: './food-cards.component.html'
})

export class FoodCardsComponent implements OnInit {
    private service = inject(FoodService)
    itemsSignal = computed(() => this.service.getItemsSignal());
    cartItem: any = computed(() => this.service.getCartSignal());
    orderplaced: boolean = false;
    colorProp: string = 'red';
    textMessage: any = '';
    constructor() { }
    addCart(product: any) {

        let duplicate = this.cartItem().some((x: any) => x.id == product.id);
        if (duplicate) {
            this.orderplaced = true;
            this.textMessage = 'Duplicate items in cart';
            this.colorProp = 'red';
            setTimeout(() => {
                this.orderplaced = false;
            }, 2000)
            return
        }
        else {
            this.service.addCart(product);
        }


        // this.input.nativeElement.value = ''


    }
    ngOnInit() { }
}