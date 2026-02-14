import { IProduct } from '../../types';

export class CartModel {
    private items: IProduct[] = [];

    constructor() {
    }

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(item: IProduct): void {
        this.items.push(item);
    }

    removeItem(itemId: string): void {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    clear(): void {
        this.items = [];
    }

    getTotalAmount(): number {
        return this.items.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);
    }

    getItemsCount(): number {
        return this.items.length;
    }

    containsItem(itemId: string): boolean {
        return this.items.some(item => item.id === itemId);
    }
}