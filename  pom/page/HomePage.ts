import { Locator, Page } from "@playwright/test";
import BasePage from "../BasePage";

export default class HomePage extends BasePage{
    private readonly signUpButton: Locator = this.page.locator("//button[contains(@class, 'hero-descriptor_btn')]");
    async open(){
        await this.page.goto('');
    }

    async openSignUpForm(){
        await this.signUpButton.click();
    }
}