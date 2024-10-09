import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { FoodService } from '../../service/food.service';

@Component({
    selector: 'app-add-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './add.to.cart.html'
})

export class AddToCartComponent implements OnInit {
    title = 'resto';
    food$: any;
    subtotal = signal(0);
    orderplaced: boolean = false;
    colorProp: string = 'red';
    intialId: number = 1001;
    initialValue: any = [];
    textMessage: string = "";

    private service = inject(FoodService);
    cartItem: any = computed(() => this.service.getCartSignal())

    constructor() { }

    ngOnInit() { }

    orderPlaced() {
        if (this.total()) {

            this.orderplaced = true;
            this.colorProp = 'green';
            this.textMessage = 'Thank You, For the Order!';

            setTimeout(() => {
                // this.input.nativeElement.value = ''
                this.service.reset();
                this.orderplaced = false;

                this.service.categoryFn(this.intialId)

            }, 2000)
        }


    }
    qtyTotal = computed(() => {
        // return this.cartItem().reduce((acc: any, itm: any) => {
        //     return acc + itm.qty
        // }, 0)
        return this.service.totalQty()
    })
    subTotalval = computed(() => {
        return this.cartItem().reduce((acc: any, itm: any) => {
            return acc + (itm.oriPrice * itm.qty)
        }, 0)

    })

    tax = computed(() => Math.floor(this.subTotalval() / 10));
    total = computed(() => this.subTotalval() + this.tax());

    qtyFn(qty: string, id: number) {
        this.service.qtyFn(qty, id);

    }
    removeItem(id: any) {
        this.service.removeItem(id)
    }
}