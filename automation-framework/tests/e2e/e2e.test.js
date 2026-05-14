import puppeteer from 'puppeteer';

describe('E2E Testing for Books to Scrape', () => {
    let browser;
    let page;

    // Збільшуємо таймаут, бо E2E сценарії складаються з багатьох кроків і виконуються довше
    jest.setTimeout(60000);

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    // Сценарій 1: Навігація в категорію "Travel" та перевірка заголовка
    test('Scenario 1: User navigates to a specific category', async () => {
        await page.goto('https://books.toscrape.com/', { waitUntil: 'networkidle2' });

        // Клікаємо на категорію "Travel" у бічному меню
        await page.click('a[href="catalogue/category/books/travel_2/index.html"]');
        await page.waitForSelector('.page-header h1');

        // Перевіряємо, чи змінився заголовок сторінки на відповідний
        const heading = await page.$eval('.page-header h1', el => el.textContent);
        expect(heading).toBe('Travel');
    });

    // Сценарій 2: Перегляд деталей конкретної книги та перевірка наявності (In stock)
    test('Scenario 2: User opens book details and checks availability', async () => {
        await page.goto('https://books.toscrape.com/', { waitUntil: 'networkidle2' });

        // Клікаємо на першу ліпшу книгу на головній сторінці
        await page.click('.product_pod a');
        await page.waitForSelector('.product_main h1');

        // Зчитуємо статус наявності товару
        const stockText = await page.$eval('.instock.availability', el => el.textContent.trim());
        expect(stockText).toContain('In stock');
    });

    // Сценарій 3: Перехід на наступну сторінку (Пагінація)
    test('Scenario 3: User navigates to the next page', async () => {
        // 1. Заходимо на головну сторінку
        await page.goto('https://books.toscrape.com/', { waitUntil: 'networkidle2' });

        // 2. Очікуємо кнопку "next" внизу сторінки і клікаємо на неї
        await page.waitForSelector('.next a', { visible: true });
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('.next a')
        ]);

        // 3. Перевіряємо, чи змінився URL (ми маємо опинитися на page-2)
        const currentUrl = page.url();
        expect(currentUrl).toContain('page-2');
    });
});