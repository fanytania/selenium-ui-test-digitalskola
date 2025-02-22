const { Builder, By, until } = require('selenium-webdriver');

(async function addToCartTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.saucedemo.com/');

        // 🔹 Login ke website
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // 🔹 Tunggu sampai dashboard terbuka
        await driver.wait(until.urlContains('inventory.html'), 5000);
        console.log("✅ Login berhasil!");

        // 🔹 Tambah item ke cart (gunakan selector yang lebih spesifik)
        let addToCartButton = await driver.findElement(By.xpath("//button[contains(text(),'Add to cart')]"));
        await addToCartButton.click();
        console.log("🛒 Item berhasil ditambahkan!");

        // 🔹 Tunggu beberapa detik supaya bisa terlihat di UI
        await driver.sleep(3000);

        // 🔹 Validasi apakah item benar-benar masuk ke cart
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
        let itemCount = await cartBadge.getText();
        console.log(`✅ Cart sekarang berisi ${itemCount} item.`);

        // Tunggu 5 detik sebelum menutup browser
        await driver.sleep(5000);

    } finally {
        await driver.quit();
    }
})();
