

export class ShopApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProduct[]> {
    return this.api.get<IProductsResponse>('/product/').then(response => response.items);
  }

  createOrder(orderData: IOrderData): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', orderData);
  }
}