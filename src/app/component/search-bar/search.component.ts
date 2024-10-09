import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject, computed, effect, } from '@angular/core';
import { FoodService } from '../../service/food.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    standalone: true,
    imports: [CommonModule]
})

export class SearchComponent implements OnInit {
    constructor() { }
    @ViewChild('input') input!: ElementRef;
    ngOnInit() { }
    private service = inject(FoodService)
    searchFilter(val: any) {
        this.service.searchFilter(val)
    }
    qtyTotal = computed(() => {
        // return this.cartItem().reduce((acc: any, itm: any) => {
        //     return acc + itm.qty
        // }, 0)
        return this.service.totalQty()
    })
    reset() {

        this.input.nativeElement.value = ''
        this.service.reset()
    }
    itemsSignal = computed(() => this.service.products);


}


