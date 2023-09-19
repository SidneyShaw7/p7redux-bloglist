describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'GG Sobaka',
      username: 'nikita',
      password: 'dmit',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5174')
  })

  it('login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('nikita')
      cy.get('#password').type('dmit')
      cy.contains('login').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('nikita')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('nikita')
      cy.get('#password').type('dmit')
      cy.contains('login').click()
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testing some title')
      cy.get('#author').type('nikitos')
      cy.get('#url').type('www.blabla.com')
      cy.contains('create').click()
      cy.contains('testing some title nikitos')
    })
  })
})
