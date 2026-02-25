// import { ensureElement } from "../../utils/utils";
// import { Component } from "../base/Component";
// import { Card } from './Card'; // Adjust the import path as necessary

// export class CardCatalog extends Card<TCardCatalog> {
//     protected imageElement: HTMLImageElement;
//     protected categoryElement: HTMLElement;

//     constructor(container: HTMLElement, actions?: ICardActions) {
//         super(container);
//         this.categoryElement = ensureElement<HTMLElement>(
//             '.card__category',
//             this.container
//         );

//         this.imageElement = ensureElement<HTMLImageElement>(
//             '.card__image',
//             this.container
//         );

//         if (actions?.onClick) {
//             this.container.addEventListener('click', actions.onClick);
//         }
//     }

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






















// // export interface ICardCatalogElement {
// //   imageElement: HTMLImageElement;
// //   categoryElement: HTMLElement;
// //   buttonElement: HTMLButtonElement;
// // }

// // export interface ICardPreviewElement {
// //   imageElement: HTMLImageElement;
// //   textElement: HTMLElement;
// //   categoryElement: HTMLElement;
// // }


// // type CategoryKey = keyof typeof categoryMap;
// // export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;

// // export class CardCatalog extends Card<TCardCatalog> {
// //     protected imageElement: HTMLImageElement;
// //     protected categoryElement: HTMLElement;

// //     constructor(container: HTMLElement, actions?: ICardActions) {
// //         super(container);
// //         this.categoryElement = ensureElement<HTMLElement>(
// //             '.card__category',
// //             this.container
// //         );

// //         this.imageElement = ensureElement<HTMLImageElement>(
// //             '.card__image',
// //             this.container
// //         );
// //         if (actions?.onClick) {
// //             this.container.addEventListener('click', actions.onClick);
// //         }
// //     }

// //     set category(value: string) {
// //         this.categoryElement.textContent = value;

// //         for (const key in categoryMap) {
// //             this.categoryElement.classList.toggle(
// //                 categoryMap[key as CategoryKey],
// //                 key === value
// //             );
// //         }
// //     }

// //     set image(value: string) {
// //         this.setImage(this.imageElement, value, this.title);
// //     }
// // }