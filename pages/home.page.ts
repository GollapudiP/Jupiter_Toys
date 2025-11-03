import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    readonly jupiterLogo: Locator;
    readonly shop: Locator;
    readonly contact: Locator;
    readonly login: Locator;

    constructor(page: Page) {
        super(page);
        this.jupiterLogo = page.locator('//h1[text()="Jupiter Toys"]');
        this.shop = page.locator('#nav-shop');
        this.contact = page.locator('#nav-contact');
        this.login = page.locator('#nav-login');
    }

    async isJupiterLogoVisible(): Promise<void> {
        expect(await this.jupiterLogo.isVisible());
    }

    async navigateToShopPage(): Promise<void> {
        await this.shop.click();
    }

    async navigateToContactPage(): Promise<void> {
        await this.contact.click();
    }

    async navigateToLoginPage(): Promise<void> {
        await this.login.click();
    }

}
