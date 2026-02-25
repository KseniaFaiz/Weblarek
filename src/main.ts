import './scss/styles.scss';
import { Api } from './components/base/Api';
import { ShopApi } from './components/Api/ShopApi.ts';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { CartModel } from './components/Models/CartModel.ts';
import { ProductModel } from './components/Models/ProductModel.ts';

//для проверки класса Product

const productsModel = new ProductModel();
productsModel.saveProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getProducts());

const items = productsModel.getProducts();
const item = items[0];
console.log('продукт по ID ', productsModel.getProductById(item.id));

productsModel.saveSelectedProduct(item)
console.log('Выбранный продукт ', productsModel.getSelectedProduct());


//для проверки класса Buyer

const buyerModel = new BuyerModel();

buyerModel.saveData({
    email: 'test@test.com',
    phone: '+79131111111',
    address: 'Бердск, ул. Первая, д. 1',
    payment: 'card'
});

console.log('Данные после сохранения:', buyerModel.getData());

const validationResult = buyerModel.validate();
console.log('Проверены все поля?', Object.keys(validationResult).length === 0);

buyerModel.clear();
console.log('Данные после очистки:', buyerModel.getData());


// для проверки класса CartModels
const cart = new CartModel();
cart.addItem(item);
const anotherItem = items[1];
cart.addItem(anotherItem);
console.log('Продукты в корзине ', cart.getItems());

console.log('Общая стоимость ', cart.getTotalAmount());
console.log('Количество товаров ', cart.getItemsCount());
console.log('Есть ли продукт в корзине ', cart.containsItem(item.id));

cart.removeItem(item.id);
console.log('Есть ли продукт в корзине ', cart.containsItem(item.id));
console.log('Продукты в корзине ', cart.getItems());

cart.clear();
console.log('Корзина пуста', cart.getItems());

//для проверки Api

// создаём экземпляр Api, который реализует IApi
const api = new Api(API_URL);
const shopApi = new ShopApi(api);
const catalogModel = new ProductModel(); // Создаём новый экземпляр

shopApi.getProducts()
    .then((items) => {
        console.log("Товары получены с сервера", items);
        catalogModel.saveProducts(items); // Используем метод setItems
    })
    .catch((error) => {
        console.error("Ошибка", error);
    });

