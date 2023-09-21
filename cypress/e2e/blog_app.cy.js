describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'GG Sobaka',
      username: 'nikita',
      password: 'dmit',
    }
    const user1 = {
      name: 'Kot Kot',
      username: 'sonya',
      password: 'dmit',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    cy.visit('http://localhost:5174')

    cy.login({ username: 'sonya', password: 'dmit' })
    cy.contains('new blog').click()
    cy.createBlog({
      title: 'Kot title',
      author: 'auto Kot',
      url: 'www.auto_url.com',
    })
    cy.contains('logout').click()
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
      cy.login({ username: 'nikita', password: 'dmit' })
      cy.contains('new blog').click()
      cy.createBlog({
        title: 'auto title',
        author: 'auto author',
        url: 'www.auto_url.com',
      })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.createBlog({
        title: 'oneMore auto title',
        author: 'oneMore auto author',
        url: 'www.auto_url.com',
      })
      cy.contains('oneMore auto title oneMore auto author')
    })

    it('users can like a blog', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('user who created a blog can remove it', function () {
      cy.contains('auto title auto author').find('button').click()
      cy.contains('remove').click()
      cy.contains('auto title auto author').should('not.exist')
    })

    it('only the creator of the blog can see delete button', function () {
      cy.contains('Kot title auto Kot').find('button').click()
      cy.contains('Kot title auto Kot').should('not.contain', 'remove')
      cy.contains('auto title auto author').find('button').click()
      cy.contains('auto title auto author').should('contain', 'remove')
    })

    it('blogs are ordered according to likes, blog with the most likes is first', function () {
      cy.get('.blog').eq(0).should('contain', 'Kot title auto Kot')
      cy.get('.blog').eq(1).should('contain', 'auto title auto author')
      cy.contains('auto title auto author').find('button').click()
      cy.contains('auto title auto author').contains('like').click().click()
      cy.get('.blog').eq(0).should('contain', 'auto title auto author')
      cy.get('.blog').eq(1).should('contain', 'Kot title auto Kot')
    })
  })
})
