module.exports = {
    'Scenario 1: Verify page title': function (browser) {
        browser
            .url('https://books.toscrape.com/')
            .assert.titleEquals('All products | Books to Scrape - Sandbox');
    },

    'Scenario 2: Verify presence of product grid': function (browser) {
        browser
            .url('https://books.toscrape.com/')
            .assert.visible('.product_pod');
    },

    'Scenario 3: Verify first product has a price': function (browser) {
        browser
            .url('https://books.toscrape.com/')
            .assert.visible('.price_color');
    },

    // Закриваємо браузер після виконання всіх тестів
    after: function (browser) {
        browser.end();
    }
};