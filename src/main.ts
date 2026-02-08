import './scss/styles.scss';
import { Api } from './components/base/Api';
import { ShopApi } from './components/Api/ShopApi.ts';
import { ProductModel } from './components/Models/ProductModel.ts';
import { CartModel } from './components/Models/CartModel.ts';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

//для проверки класса Product
class Products {
    items: IProduct[] = [];
    setItems(items: IProduct[]): void {
        this.items = items;
    } ;
    getItems():  IProduct[] {
        return this.items;
    };
}

const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getItems());

//для проверки класса Buyer

    const buyerModel = new BuyerModel();
    
    buyerModel.saveData({
        email: 'test@test.com',
        phone: '+79131111111',
        address: 'Бердск, ул. Первая, д. 1',
        payment: 'online'
    });


  console.log('Данные после сохранения:', buyerModel.getData());
    
    const validationResult = buyerModel.validate();
    console.log('Проверены все поля?', Object.keys(validationResult).length === 0);
    
    buyerModel.clear();
    console.log('Данные после очистки:', buyerModel.getData());

    
// для проверки класса CartModels

      const cartModel = new CartModel();

    if (allProducts.length >= 3) {
        cartModel.addItem(allProducts[0]);
        cartModel.addItem(allProducts[1]);
        cartModel.addItem(allProducts[2]);
        
        const cartItems = cartModel.getItems();
        console.log('Товары в корзине:', cartItems);
        console.log('Количество товаров в корзине:', cartModel.getItemsCount());
        
        console.log('Общая стоимость корзины:', cartModel.getTotalAmount());
        
        const firstProductId = allProducts[0].id;
        console.log('Содержит товар', firstProductId, ':', cartModel.containsItem(firstProductId));
        
        cartModel.removeItem(firstProductId);
        console.log('После удаления товара', firstProductId, ':');
        console.log('Количество товаров:', cartModel.getItemsCount());
        console.log('Содержит удаленный товар:', cartModel.containsItem(firstProductId));
        
        cartModel.clear();
        console.log('После очистки корзины:');
        console.log('Количество товаров:', cartModel.getItemsCount());
        console.log('Общая стоимость:', cartModel.getTotalAmount());
    }



    //для проверки Api

const shopApi = new ShopApi(api);
const serverProductModel = new ProductModel();

shopApi.getProducts()
    .then(products => {
        console.log('Получено товаров с сервера:', products.length);
        
        serverProductModel.saveProducts(products);
        
        const savedProducts = serverProductModel.getProducts();
        console.log('Товаров сохранено в модель:', savedProducts.length);
        console.log('Каталог из модели:', savedProducts);
    })