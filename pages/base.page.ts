import { Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly homeUrl: string = 'http://jupiter.cloud.planittesting.com';

    constructor(page: Page) {
        this.page = page;
    }
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(this.homeUrl);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ path });
    }
}