const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.saucedemo.com/');

        // Input username & password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // Tunggu sampai halaman dashboard terbuka
        await driver.wait(until.urlContains('inventory.html'), 5000);
        console.log("✅ Login berhasil!");

    } finally {
        await driver.quit();
    }
})();

