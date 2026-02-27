import { IProductsResponse } from "../../types";
import { IOrderResponse } from "../../types";
import { Api } from "../base/Api";

export class AppApi extends Api{
  constructor(baseUrl: string, options: RequestInit = {}) {
    super(baseUrl, options);
  }

  getCatalog(): Promise<IProductsResponse> {
    return this.get('/product/');
  }

  createOrder(order: IProductsResponse): Promise<IOrderResponse>{
    return this.post('/order', order).then((data => data as IOrderResponse));
  }
}