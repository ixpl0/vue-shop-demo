describe('Home page', () => {
  it('renders multiple category buttons', () => {
    cy.visit('/');

    cy.get('[data-test="category-button"]').should('have.length.greaterThan', 1);
  });

  it('renders product list with expected structure', () => {
    cy.visit('/');

    cy.get('[data-test="product"]').as('products').should('have.length.greaterThan', 0);

    cy.get('@products').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('[data-test="product-image-link"]').should('exist');
        cy.get('[data-test="product-name-link"]').should('exist');
        cy.get('[data-test="product-price"]').should('exist');
        cy.get('[data-test="add-to-cart"]').should('exist');
      });
    });
  });

  ['product-name-link', 'product-image-link'].forEach((selector) => {
    it(`navigates to product page when clicking on ${selector}`, () => {
      cy.visit('/');

      cy.get('[data-test="product"]')
        .first()
        .within(() => {
          cy.get(`[data-test="${selector}"]`).click();
        });

      cy.url().should('include', '/product/');
      cy.get('h1').should('exist');
    });
  });

  it('shows cart counter after adding a product', () => {
    cy.visit('/');

    cy.get('[data-test="cart-count"]').should('not.exist');

    cy.get('[data-test="product"]')
      .first()
      .within(() => {
        cy.get('[data-test="add-to-cart"]').click();
      });

    cy.get('[data-test="cart-count"]').should('have.text', '1');
  });
});
