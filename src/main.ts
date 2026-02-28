import './scss/styles.scss';
import { BuyerModel } from './components/Models/BuyerModel.ts';
import { CartModel } from './components/Models/CartModel.ts';
import { ProductModel } from './components/Models/ProductModel.ts';
import { EventEmitter } from './components/base/Events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Gallery } from './components/ClassComponents/Gallery.ts';
import { Header } from './components/ClassComponents/Header.ts';
import { CardCatalog } from './components/ClassComponents/Card/CardCatalog.ts';
import { AppApi } from './components/ClassComponents/AppApi.ts';
import { API_URL, CDN_URL } from './utils/constants';
import { CardPreview } from './components/ClassComponents/Card/CardPreview.ts';
import { Modal } from './components/ClassComponents/Modal.ts';
import { Basket } from './components/ClassComponents/Basket.ts';
import { CardBasket } from './components/ClassComponents/Card/CardBasket.ts';
import { IProductsResponse, IBuyer } from './types';
import { FormOrder } from './components/ClassComponents/Form/FormOrder.ts';
import { FormContacts } from './components/ClassComponents/Form/FormContact.ts';
import { Success } from './components/ClassComponents/Success.ts';


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

    const selectedProduct = products.getSelectedProduct();
    if (!selectedProduct) return;

    const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
    const inBasket = cart.containsItem(event.id);

    modal.content = cardPreview.render(selectedProduct, inBasket);
    modal.open();
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
    events.emit('order-form:open')
});

events.on('order-form:open', () => {
    const buyerData = buyer.getData();
    // console.log('bayer', buyerData)
    const orderForm = new FormOrder(cloneTemplate(formOrderTemplate), events);

    if (buyerData?.payment) {
        orderForm.payment = buyerData.payment;
    }
    orderForm.address = buyerData?.address ?? '';

    const errors = buyer.validate();
    orderForm.checkErrors(errors);

    modal.content = orderForm.render()
    modal.open();
});

events.on('buyer:change', (buyerData: IBuyer) => {
    buyer.saveData(buyerData)
    events.emit('order-form:open')
});

events.on('order:submit', () => {
    events.emit('contacts-form:open')
});

events.on('contacts-form:open', () => {
    const buyerData = buyer.getData();
    // console.log('bayer', buyerData)
    const contactsForm = new FormContacts(cloneTemplate(formContactsTemplate), events);
    contactsForm.email = buyerData?.email
    contactsForm.phone = buyerData?.phone

    const errors = buyer.validateContacts();
    contactsForm.checkErrors(errors);

    modal.content = contactsForm.render()


    modal.open();
});

events.on('buyer:change-contacts', (buyerData: IBuyer) => {
    buyer.saveData(buyerData)
    events.emit('contacts-form:open')
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

events.on('cart:success', (result: { total: number }) => {
    const success = new Success(cloneTemplate(successTemplate),
        events,
        {
            onOrdered: () => {
                modal.close();
            }
        },
    );
    success.total = result.total;

    modal.content = success.render()
    modal.open();

    reset();
});

function reset() {
    cart.clear();
    header.counter = cart.getTotalCartProducts();
    buyer.clear();
}

