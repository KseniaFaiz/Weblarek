import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


export interface IBasket {
  list: HTMLElement;
  price: HTMLElement;
  button: HTMLButtonElement;
}

export class Basket extends Component<IBasket> {
  protected basketList: HTMLElement;
  protected basketPrice: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);
    this.basketList = ensureElement<HTMLElement>(
      '.basket__list',
      this.container
    );

    this.basketPrice = ensureElement<HTMLElement>(
      '.basket__price',
      this.container
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      '.basket__button',
      this.container
    );

  }

    // Sets the items in the basket
    set list(items: HTMLElement[]) {
        this.basketList.innerHTML = ''; // Clear existing items
        items.forEach(item => {
            this.basketList.appendChild(item); // Append each item to the list
        });
    }

    // Updates the total price displayed in the basket
    set price(value: number) {
        this.basketPrice.textContent = `${value} синапсов`; // Update price display
    }

    // Method to enable the button based on the basket state
    updateButtonState(isEnabled: boolean) {
        this.basketButton.disabled = !isEnabled; // Enable or disable button
    }

    // Optional: Method to clear the basket
    clearBasket() {
        this.basketList.innerHTML = ''; // Clear items
        this.price = 0; // Reset price
        this.updateButtonState(false); // Disable button
    }

    // Optional: Method to add an item to the basket
    addItem(item: HTMLElement) {
        this.basketList.appendChild(item);
        this.updateButtonState(true); // Ensure button is enabled
    }
}

