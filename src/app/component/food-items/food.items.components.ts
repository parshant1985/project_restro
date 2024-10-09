import { AsyncPipe, CommonModule, JsonPipe, } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, computed, effect, inject, signal, viewChild, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { FoodService } from '../../service/food.service';

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [RouterOutlet, AsyncPipe, JsonPipe, CommonModule,],
    templateUrl: './food.items.html',

})
export class FoodItemsComponent implements OnInit {

    private service = inject(FoodService)


    categories = computed(() => this.service.categories());
    intialId = computed(() => this.service.intialId())

    categoryFn(id: any) {

        this.service.categoryFn(id);

    }
    ngOnInit(): void {
        this.categoryFn(this.intialId())
    }

}