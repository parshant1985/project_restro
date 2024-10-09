import { Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { product } from './product.data';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class FoodService {
    title = 'resto';
    food$: any;
    subtotal = signal(0);

    intialId = signal<number>(1001);
    initialValue: any = [];
    productsItems: any = [];
    productSignal: WritableSignal<any[]> = signal<any[]>([]);
    products: any = product;

    cartItem = signal<any>([]);
    private http = inject(HttpClient)
    private p_server: any = this.http.get('http://localhost:3000/api/category');
    categories = toSignal<any | undefined>(this.p_server, { initialValue: undefined })

    constructor() { }
    categoryFn(id: number) {
        this.intialId.update((ite) => ite = id);
        const cc = this.productsItems = this.products.filter((it: any) => it.categoryId == id);
        this.productSignal.update((current) => current = cc);
        return cc

    }
    getItemsSignal() {
        return this.productSignal();
    }

    addCart(product: any) {

        // this.input.nativeElement.value = ''
        this.cartItem.update((item: any) => item.some((x: any) => x.id == product.id) ? item : [...item, { name: product.name, image: product.image, oriPrice: product.price, price: product.price, qty: 1, id: product.id, category: product.categoryId }])


    }

    getCartSignal() {
        return this.cartItem();
    }


    qtyFn(xnum: string, id: number) {
        this.cartItem.update((item: any) => item.map((itm: any) => {
            return (itm.id == id) ? { ...itm, qty: this.qtycheck(xnum, itm), price: (itm.qty * itm.oriPrice) } : itm;

        }));

    }
    qtycheck(i: string, itm: any) {
        if (i == 'inc' && itm.qty < 5) {
            return itm.qty + 1
        }
        else if (i == 'dec' && itm.qty > 1) {
            return itm.qty - 1
        }
        return itm.qty
    }

    totalQty() {
        const dd = this.cartItem().reduce((acc: any, itm: any) => {
            return acc + itm.qty
        }, 0)
        return dd;
    }

    removeItem(id: number) {
        this.cartItem.update((item: any) => item.filter((x: any) => x.id != id))
    }
    reset() {
        this.cartItem.update((item: any) => item = []);
        this.intialId.update((item) => item = 1001);
        this.categoryFn(this.intialId())
    }

    category() {

        return this.categories()
    }

    searchFilter(val: any): void {
        const copy = this.productSignal();
        if (val.length > 0) {
            const copy = this.products.filter((it: any) => it.name.toLocaleLowerCase().includes(val))
            this.productSignal.update((x) => x = copy);
        }
        else {
            this.categoryFn(this.intialId())
        }



    }

}


