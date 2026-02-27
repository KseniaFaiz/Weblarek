import './scss/styles.scss';
import { Api } from './components/base/Api.ts';
import { ShopApi } from './components/Api/ShopApi.ts';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { apiProducts } from './utils/data';
import { CartModel } from './components/Models/CartModel.ts';
import { ProductModel } from './components/Models/ProductModel.ts';
import { EventEmitter } from './components/base/Events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Gallery } from './components/ClassComponents/Gallery.ts';
// import { Card } from './components/ClassComponents/Card/Card.ts';
import { Header } from './components/ClassComponents/Header.ts';
import { CardCatalog } from './components/ClassComponents/Card/CardCatalog.ts';
import { AppApi } from './components/ClassComponents/AppApi.ts';
import { API_URL, CDN_URL } from './utils/constants';
import { CardPreview } from './components/ClassComponents/Card/CardPreview.ts';
import { Modal } from './components/ClassComponents/Modal.ts';
import { Basket } from './components/ClassComponents/Basket.ts';
import { CardBasket } from './components/ClassComponents/Card/CardBasket.ts';
import { IProductsResponse, IBuyer } from './types';
// import { Form } from './components/ClassComponents/Form/Form.ts';
import { FormOrder } from './components/ClassComponents/Form/FormOrder.ts';
import { FormContacts } from './components/ClassComponents/Form/FormContact.ts';
import { Success } from './components/ClassComponents/Success.ts';
import { Payment } from './types';


const events = new EventEmitter();
const api = new AppApi(API_URL);

const products = new ProductModel(events);
const cart = new CartModel(events);
const buyer = new BuyerModel(events);

const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.page__wrapper'), events);

await api.getCatalog()
    .then(catalog => catalog.items.map(product => (
        { ...product, image: `${CDN_URL}/${product.image}`.replace('svg', 'png') }
    )))
    .then(productsWithImages => {
        products.saveProducts(productsWithImages);
    })
    .catch(error => console.error('Ошибка загрузки каталога', error));

const productsTest = products.getProducts();

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

productsTest.forEach(product => {
    // Создаём компонент
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
    gallery.galleryElement.appendChild(card.render(product));
})

const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const formOrderTemplate = ensureElement<HTMLTemplateElement>('#order');
const formContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const modalContainer = ensureElement<HTMLDivElement>('#modal-container');
const modal = new Modal(modalContainer, events);




events.on('card:select', (event: { id: string }) => {
    products.setSelectedProduct(event.id);
    const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
    const inBasket = cart.containsItem(event.id)
    modal.content = cardPreview.render(products.getSelectedProduct(), inBasket)
    modal.open()
});

events.on('basket:open', () => {
    const basket = new Basket(
        cloneTemplate<HTMLElement>(basketTemplate),
        events);
    basket.basket = cart.getItems().map((item, index) => {
        const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), events);
        cardBasket.index = index + 1
        cardBasket.title = item.title
        cardBasket.price = item.price
        cardBasket.id = item.id
        return cardBasket.render(item)
    });
    basket.total = cart.getTotalAmount()

    modal.content = basket.render()
    modal.open();
});

events.on('card:add-product', (event: { id: string }) => {
    const product = products.getProductById(event.id);
    if (!product) {
        return;
    }
    if (!cart.containsItem(event.id))
        cart.addItem(product);

    events.emit('cart:changed')
});

events.on('card:remove-product', (event: { id: string, fromCart: boolean }) => {
    const product = products.getProductById(event.id);
    if (!product) {
        return;
    }

    cart.removeItem(product.id);
    events.emit('cart:changed')
    if (event.fromCart) {
        events.emit('basket:open')
    }

});

events.on('cart:changed', () => {
    header.counter = cart.getItemsCount();
});

events.on('basket:render', () => {
    header.counter = cart.getItemsCount();
});

events.on('cart:order', () => {
    // const buyerData = buyer.getData();
    // console.log('bayer', buyerData)
    const orderForm = new FormOrder(cloneTemplate(formOrderTemplate), events);
    // orderForm.payment = buyerData?.payment ?? 'card';
    // orderForm.address = buyerData?.address ?? '';

    // const addressErrors = buyer.validate();
    // orderForm.isAddressValid(addressErrors);

    modal.content = orderForm.render()


    modal.open();
});















// const contactsForm = new FormContacts(cloneTemplate(formContactsTemplate), events);
// const successView = new Success(cloneTemplate(successTemplate),
//     events,
//     {
//         onOrdered: () => {
//             modal.close();
//         }
//     },
// );

// const success = new Success(
//     document.querySelector('.order-success') as HTMLElement,
//     events,
//     {
//         onOrdered: () => console.log('Заказ закрыт')
//     }
// );







events.on('catalog:changed', () => {
    const itemCards = products.getProducts().map((item) => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
        return card.render(item);
    });
    gallery.render({ catalog: itemCards });
});




events.on('product:changed', (event: { id: string }) => {
    const product = products.getProductById(event.id);
    if (!product) {
        return;
    }

    const productInCart = cart.isProductInCart(event.id);

    modal.render({
        content: cardPreview.render(product, productInCart),
    });
    modal.open();
});







events.on('cart:open', () => {
    modal.render({ content: basket.render() });
    modal.open();
});

events.on('buyer:change', (data: Partial<IBuyer>) => {
    buyer.saveData(data);
});

events.on('buyer:changed', (buyerData: IBuyer) => {
    const payment: Payment = buyerData.payment ?? 'card';

    orderForm.payment = payment;
});



events.on('order:submit', () => {
    modal.render({ content: contactsForm.render() });
    modal.open();
});

events.on('cart:contacts', () => {
    const buyerData = buyer.getData();

    contactsForm.email = buyerData?.email ?? '';
    contactsForm.phone = buyerData?.phone ?? '';
    contactsForm.isContactsValid(buyer.validate());

    modal.render({ content: contactsForm.render() });
    modal.open();
});

events.on('contacts:submit', async () => {
    const buyerData = buyer.getData();

    if (!buyerData) {
        return;
    }

    const orderData: IProductsResponse = {
        payment: buyerData.payment ?? 'card',
        email: buyerData.email,
        phone: buyerData.phone,
        address: buyerData.address,
        total: cart.getTotalAmount(),
        items: cart.getItems(),
    };

    try {
        const result = await api.createOrder(orderData);
        events.emit('cart:success', result);
    } catch (err) {
        console.error(err);
    }
});

function cleanupAfterSuccess() {
    cart.clear();
    header.counter = cart.getTotalCartProducts();
    buyer.clear();
}

events.on('cart:success', (result: { total: number }) => {
    successView.total = result.total;

    modal.render({ content: successView.render() });
    modal.open();

    cleanupAfterSuccess();
});

// api.getCatalog()
//     .then(catalog => catalog.items.map(product => (
//         { ...product, image: `${CDN_URL}/${product.image}`.replace('svg', 'png') }
//     )))
//     .then(productsWithImages => {
//         products.saveProducts(productsWithImages);
//     })
//     .catch(error => console.error('Ошибка загрузки каталога', error));


// создаём экземпляр Api, который реализует IApi
// // const api = new Api(API_URL);
// const shopApi = new ShopApi(api);
// const catalogModel = new ProductModel(); // Создаём новый экземпляр
// const events = new EventEmitter();
// const api = new AppApi(API_URL);



//     // Обновляем форму заказа (шаг 1)
//     orderForm.address = buyerData?.address ?? '';
//     orderForm.payment = buyerData?.payment ?? 'card';
//     orderForm.isAddressValid(buyer.sumAddressErrors());

//     // Обновляем форму контактов (шаг 2)
//     contactsForm.email = buyerData?.email ?? '';
//     contactsForm.phone = buyerData?.phone ?? '';
//     contactsForm.isContactsValid(buyer.sumContactsErrors());
// });

// //для проверки класса Product

// const productsModel = new ProductModel();
// productsModel.saveProducts(apiProducts.items);
// console.log('Массив товаров из каталога: ', productsModel.getProducts());

// const items = productsModel.getProducts();
// const item = items[0];
// console.log('продукт по ID ', productsModel.getProductById(item.id));

// productsModel.saveSelectedProduct(item)
// console.log('Выбранный продукт ', productsModel.getSelectedProduct());


// //для проверки класса Buyer

// const buyerModel = new BuyerModel();

// buyerModel.saveData({
//     email: 'test@test.com',
//     phone: '+79131111111',
//     address: 'Бердск, ул. Первая, д. 1',
//     payment: 'card'
// });

// console.log('Данные после сохранения:', buyerModel.getData());

// const validationResult = buyerModel.validate();
// console.log('Проверены все поля?', Object.keys(validationResult).length === 0);

// buyerModel.clear();
// console.log('Данные после очистки:', buyerModel.getData());


// // для проверки класса CartModels
// const cart = new CartModel();
// cart.addItem(item);
// const anotherItem = items[1];
// cart.addItem(anotherItem);
// console.log('Продукты в корзине ', cart.getItems());

// console.log('Общая стоимость ', cart.getTotalAmount());
// console.log('Количество товаров ', cart.getItemsCount());
// console.log('Есть ли продукт в корзине ', cart.containsItem(item.id));

// cart.removeItem(item.id);
// console.log('Есть ли продукт в корзине ', cart.containsItem(item.id));
// console.log('Продукты в корзине ', cart.getItems());

// cart.clear();
// console.log('Корзина пуста', cart.getItems());

//для проверки Api

// создаём экземпляр Api, который реализует IApi
// // const api = new Api(API_URL);
// const shopApi = new ShopApi(api);
// const catalogModel = new ProductModel(); // Создаём новый экземпляр
// const events = new EventEmitter();
// const api = new AppApi(API_URL);
