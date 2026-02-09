import './scss/styles.scss';
import { Api } from './components/base/Api';
import { ShopApi } from './components/Api/ShopApi.ts';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { IProduct } from './types/index.ts';

//для проверки класса Product
class Products {
    items: IProduct[] = [];
    setItems(items: IProduct[]): void {
        this.items = items;
    };
    getItems(): IProduct[] {
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


//для проверки Api

// создаём экземпляр Api, который реализует IApi
const api = new Api(API_URL);
const shopApi = new ShopApi(api);
const catalogModel = new Products(); // Создаём новый экземпляр

shopApi.getProducts()
    .then((items) => {
        console.log("Товары получены с сервера", items);
        catalogModel.setItems(items); // Используем метод setItems
    })
    .catch((error) => {
        console.error("Ошибка", error);
    });