import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./home.page";

export class ContactPage extends HomePage {
    readonly foreName: Locator;
    readonly email: Locator;
    readonly message: Locator;
    readonly submitButton: Locator;
    readonly foreNameError: Locator;
    readonly emailError: Locator;
    readonly messageError: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.foreName = page.locator('#forename');
        this.email = page.locator('#email');
        this.message = page.locator('#message');
        this.submitButton = page.locator('//a[text()="Submit"]');
        this.foreNameError = page.locator('#forename-err');
        this.emailError = page.locator('#email-err');
        this.messageError = page.locator('#message-err');
        this.successMessage = page.locator('//div[contains(@class, "alert-success")]');
    }

    async fillContactForm(forename: string, email: string, message: string): Promise<void> {
        await this.foreName.fill(forename);
        await this.email.fill(email);
        await this.message.fill(message);
    }

    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }

    async validateContactFormErrors(foreNameErrorMessage: string, emailErrorMessage: string, messageErrorMessage: string): Promise<void> {
        await expect(this.foreNameError).toHaveText(foreNameErrorMessage);
        await expect(this.emailError).toHaveText(emailErrorMessage);
        await expect(this.messageError).toHaveText(messageErrorMessage);
    }

    async validateNoContactFormErrors(): Promise<void> {
        await expect(this.foreNameError).toBeHidden();
        await expect(this.emailError).toBeHidden();
        await expect(this.messageError).toBeHidden();
    }

    async validateSuccessfulSubmission(message: string): Promise<void> {
        await expect(this.page.getByText(message)).toBeVisible({ timeout: 200000 });
    }
}