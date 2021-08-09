describe("User should be able to succesfully login and be directed to their dashboard", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });
    it("Fills out the form and hits login", () => {

        cy.get('[data-testid="email"]')
            .type("johndoe@email.com")

        cy.get('[data-testid="password"]')
            .type("password")

        cy.get('[data-testid="loginBtn"]')
            .click()
        
        cy.wait(300)

        cy.contains("John")

    });

});
