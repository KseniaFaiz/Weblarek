import { IProduct } from '../../types';
import { IEvents } from "../base/Events";
export class ProductModel {
    private products: IProduct[] = [];
    private selectedProduct: IProduct | null = null;

    constructor(protected events: IEvents) {
    }

    saveProducts(products: IProduct[]): void {
        this.products = products;
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProductById(id: string): IProduct | null {
        return this.products.find(product => product.id === id) || null;
    }

    saveSelectedProduct(product: IProduct): void {
        this.selectedProduct = product;
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
    setSelectedProduct(id: string) {
        const product = this.products.find(p => p.id === id) || null;
        this.selectedProduct = product;
    }
}