import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";
import { Card } from "./Card";
import { categoryMap } from "../../../utils/constants";
import { IEvents } from "../../base/Events";

export interface ICardCatalogElement {
    imageElement: HTMLImageElement;
    categoryElement: HTMLElement;
    buttonElement: HTMLButtonElement;
}

export interface ICardPreviewElement {
    imageElement: HTMLImageElement;
    textElement: HTMLElement;
    categoryElement: HTMLElement;
}


type CategoryKey = keyof typeof categoryMap;
// export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;
export type TCardCatalog = Pick<IProduct, 'id' | 'title' | 'image' | 'category'>;

export class CardCatalog extends Card<TCardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    // constructor(container: HTMLElement, actions?: ICardActions) {
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>(
            '.card__category',
            this.container
        );

        this.imageElement = ensureElement<HTMLImageElement>(
            '.card__image',
            this.container
        );
        this.container.addEventListener('click', () => {
            this.events.emit('card:select', { id: this.id });
        });
        // if (actions?.onClick) {
        //     this.container.addEventListener('click', actions.onClick);
        // }
    }

    render(data: TCardCatalog): HTMLElement {
        this.id = data.id;
        return super.render(data);
    }

    set category(value: string) {
        this.categoryElement.textContent = String(value);

        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key === value
            );
        };
    };

    set image(value: string) {
        this.setImage(this.imageElement, value, this.title);
    };
};

//     set category(value: string) {
//         this.categoryElement.textContent = value;

//         for (const key in categoryMap) {
//             this.categoryElement.classList.toggle(
//                 categoryMap[key as CategoryKey],
//                 key === value
//             );
//         }
//     }

//     set image(value: string) {
//         this.setImage(this.imageElement, value, this.title);
//     }
// }