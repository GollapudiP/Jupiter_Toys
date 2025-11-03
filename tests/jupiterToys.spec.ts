import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { HomePage } from '../pages/home.page';
import { ContactPage } from '../pages/contact.page';
import { ShopPage } from '../pages/shop.page';
import { CartPage } from '../pages/cart.page';
import { records } from '../utilities/csv.reader';

test('Contact page displays errors when mandatory fields are empty', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo(basePage.homeUrl);

    const homePage = new HomePage(page);
    await homePage.isJupiterLogoVisible();
    await homePage.navigateToContactPage();

    const contactPage = new ContactPage(page);
    await contactPage.submitForm();
    await contactPage.validateContactFormErrors(
        'Forename is required',
        'Email is required',
        'Message is required'
    );
});

test('Contact page does not display errors when mandatory fields are filled', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo(basePage.homeUrl);

    const homePage = new HomePage(page);
    await homePage.isJupiterLogoVisible();
    await homePage.navigateToContactPage();

    const contactPage = new ContactPage(page);
    await contactPage.fillContactForm('John Doe', 'john@doe.com', 'This is a test message.');
    await contactPage.submitForm();
    await contactPage.validateNoContactFormErrors();
});

for (const record of records) {
    test(`Contact page successful submission for ${record.forename}`, async ({ page }) => {
        test.slow();
        const basePage = new BasePage(page);
        await basePage.navigateTo(basePage.homeUrl);
        const homePage = new HomePage(page);
        await homePage.isJupiterLogoVisible();
        await homePage.navigateToContactPage();

        const contactPage = new ContactPage(page);
        await contactPage.fillContactForm(record.forename, record.email, record.message);
        await contactPage.submitForm();
        await contactPage.validateSuccessfulSubmission(`Thanks ${record.forename}, we appreciate your feedback.`);
    });
}

test('Verify price of the items and subtotal in the cart', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateTo(basePage.homeUrl);

    const homePage = new HomePage(page);
    await homePage.isJupiterLogoVisible();
    await homePage.navigateToShopPage();

    const shopPage = new ShopPage(page);
    await shopPage.addItemsToCart('Stuffed Frog');
    await shopPage.addItemsToCart('Fluffy Bunny');
    await shopPage.addItemsToCart('Valentine Bear');
    await shopPage.navigateToCartPage();

    const cartPage = new CartPage(page);
    await cartPage.updateItemQuantity(1, 2);  // Update quantity of Suffed Frog to 2
    await cartPage.updateItemQuantity(2, 5);  // Update quantity of Fluffy Bunny to 5
    await cartPage.updateItemQuantity(3, 3);  // Update quantity of Valentine Bear to 3
    expect(await cartPage.getItemPrice(1)).toBe(10.99);
    expect(await cartPage.getItemPrice(2)).toBe(9.99);
    expect(await cartPage.getItemPrice(3)).toBe(14.99);
    expect(await cartPage.getSubTotal(1)).toBeCloseTo(21.98);
    expect(await cartPage.getSubTotal(2)).toBeCloseTo(49.95);
    expect(await cartPage.getSubTotal(3)).toBeCloseTo(44.97);
    const expectedCartSubTotal = 21.98 + 49.95 + 44.97;
    expect(await cartPage.getCartSubTotal()).toBeCloseTo(expectedCartSubTotal);
});