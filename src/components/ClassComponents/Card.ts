import { ensureElement } from "../../utils/utils";

export interface IProduct {
    image: string;
    category: string;
    title: string; // Assuming title is part of IProduct
}

export interface ICardActions {
    onClick?: (event: MouseEvent) => void;
}

export class Card<T extends IProduct> {
    protected container: HTMLElement;
    protected titleElement: HTMLElement; // Add title element handling

    constructor(container: HTMLElement) {
        this.container = container;
        this.titleElement = ensureElement<HTMLElement>(
            '.card__title', // Assuming title is in the card HTML
            this.container
        );
    }

    // Method to set the image element with error handling
    protected setImage(imageElement: HTMLImageElement, imageUrl: string, title: string) {
        imageElement.src = imageUrl;

        // Optionally, handle load error
        imageElement.onerror = () => {
            imageElement.src = './src/images/default-image.png'; // Fallback image
            console.warn(`Image not found for ${title}: ${imageUrl}`);
        };
    }

    set title(value: string) {
        this.titleElement.textContent = value; // Assumes title element exists
    }
}






// import { ensureElement } from "../../utils/utils";
// import { Component } from "../base/Component";

// interface ICard {
//     title: string;
//     price: number;
// }

// export class Card extends Component<ICard> {
//     protected titleElement: HTMLElement;
//     protected priceElement: HTMLElement;

//     constructor(container: HTMLElement) {
//         super(container);
//         this.titleElement = ensureElement<HTMLElement>(
//             '.card__title',
//             this.container
//         );

//         this.priceElement = ensureElement<HTMLButtonElement>(
//             '.card__price',
//             this.container
//         );
//     }

//     set title(value: string) {
//         this.titleElement.textContent = String(value);
//     }
//     set price(value: number) {
//         this.priceElement.textContent = String(value);
//     }
// }





