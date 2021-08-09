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

        cy.contains("John").should('be.visible')

    });

});


describe('Fetch Request', () => {
    it('Will request daily  weather information based on the logged in user\'s saved zipcode', () => {
        cy.request('api.openweathermap.org/data/2.5/weather?zip=14211&appid=c58c3fb30ceedded908944ec0edfb311&units=imperial ')
            .should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.equal("Buffalo")
                expect(response).to.have.property('headers')
                expect(response).to.have.property('duration')
            })
    })

});