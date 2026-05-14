import puppeteer from 'puppeteer';

describe('UI Testing with Puppeteer', () => {
    let browser;
    let page;

    jest.setTimeout(30000);

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        // Переходимо на надійний тестовий сайт з книгами
        await page.goto('https://books.toscrape.com/', {
            waitUntil: 'networkidle2'
        });
    });

    afterAll(async () => {
        await browser.close();
    });

    // Тест 1: Перевірка правильного заголовка сторінки
    test('Verify page title', async () => {
        const title = await page.title();
        expect(title).toBe('All products | Books to Scrape - Sandbox');
    });

    // Тест 2: Перевірка наявності товарів (книг) на сторінці
    test('Verify presence of product grid', async () => {
        const productGrid = await page.$('.product_pod');
        expect(productGrid).not.toBeNull();
    });

    // Тест 3: Перевірка, що кількість книг на сторінці більша за 0
    test('Verify product count is greater than 0', async () => {
        const products = await page.$$('.product_pod');
        expect(products.length).toBeGreaterThan(0);
    });

    // Тест 4: Перевірка наявності бічного меню з категоріями
    test('Verify categories sidebar presence', async () => {
        const sidebar = await page.$('.side_categories');
        expect(sidebar).not.toBeNull();
    });

    // Тест 5: Перевірка, що ціна першої книги більша за 0
    test('Verify first product price', async () => {
        const firstProductPriceText = await page.$eval('.price_color', el => el.textContent);
        // Видаляємо знак фунта (£) і перетворюємо текст ціни на число
        const price = parseFloat(firstProductPriceText.replace('£', ''));
        expect(price).toBeGreaterThan(0);
    });
});