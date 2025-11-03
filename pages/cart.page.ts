import { Page } from "@playwright/test";
import { ShopPage } from "./shop.page";

export class CartPage extends ShopPage {

    constructor(page: Page) {
        super(page);
    }

    async updateItemQuantity(itemNumber: number, quantity: number): Promise<void> {
        await this.page.locator(`//tr[${itemNumber}]//input`).fill(quantity.toString());
    }

    async getItemPrice(itemNumber: number): Promise<number> {
        const priceText = await this.page.locator(`//tr[${itemNumber}]//td[2]`).innerText();
        console.log(`Getting price for item number: ${itemNumber} - Price Text: ${priceText}`);
        return parseFloat(priceText.replace('$', ''));
    }

    async getSubTotal(itemNumber: number): Promise<number> {
        const subTotalText = await this.page.locator(`//tr[${itemNumber}]//td[4]`).innerText();
        console.log(`Getting subTotal for item number: ${itemNumber} - Price Text: ${subTotalText}`);
        return parseFloat(subTotalText.replace('$', ''));
    }

    async getCartSubTotal(): Promise<number> {
        const cartSubTotalText = await this.page.locator('//tfoot//td/strong').innerText();
        console.log(`Getting cart subTotal - Price Text: ${cartSubTotalText}`);
        return parseFloat(cartSubTotalText.replace('Total: ', ''));
    }

}
