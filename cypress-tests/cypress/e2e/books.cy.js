describe('Books to Scrape Tests - Cypress', () => {
    // Цей хук виконується перед кожним тестом
    beforeEach(() => {
        cy.visit('https://books.toscrape.com/');
    });

    // Тест 1: Перевірка заголовка сторінки
    it('Scenario 1: Verify page title contains All products', () => {
        cy.title().should('eq', 'All products | Books to Scrape - Sandbox');
    });

    // Тест 2: Перевірка наявності сітки товарів
    it('Scenario 2: Verify presence of product grid', () => {
        cy.get('.product_pod').should('exist');
    });

    // Тест 3: Перевірка наявності ціни у першої книги
    it('Scenario 3: Verify first product has a price', () => {
        cy.get('.price_color').first().should('exist');
    });
});