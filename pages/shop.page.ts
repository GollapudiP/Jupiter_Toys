import { Locator, Page } from '@playwright/test';
import { HomePage } from './home.page';

export class ShopPage extends HomePage {
    readonly cart: Locator;

    constructor(page: Page) {
        super(page);
        this.cart = page.locator('#nav-cart');
    }

    async addItemsToCart(toy: string): Promise<void> {
        await this.page.locator(`//h4[text()="${toy}"]/..//a`).click();
    }

    async navigateToCartPage(): Promise<void> {
        await this.cart.click();
    }
}
