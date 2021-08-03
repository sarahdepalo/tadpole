describe("User should be able to succesfully login and be directed to their dashboard", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/login");
    });
    it("Fills out the form and hits login", () => {

        cy.get('[data-testid="email"]')
            .type("raven@edgarallenpoe.com")

        cy.get('[data-testid="password"]')
            .type("password")

        cy.get('[data-testid="loginBtn"]')
            .click()
        
        cy.wait(300)

        cy.contains("Dashboard").should('be.visible')

        cy.contains("Edgar").should('be.visible')

    });

});
