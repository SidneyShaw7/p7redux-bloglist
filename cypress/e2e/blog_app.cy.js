describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // const user = {
    //   name: 'GG Sobaka',
    //   username: 'nikita',
    //   password: 'dmit',
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5174')

    it('login form is shown', function () {
      cy.contains('Log in to application')
      cy.contains('input:first')
      cy.contains('input:last')
    })
  })
})
