/**
 * Render various pages.
 */
export class PageController {

  renderHomePage (req, res) {
    res.render('home', {
      title: 'Welcome',
      error: req.query.error || null
    })
  }

  renderLoginPage (req, res) {
    res.render('authenticate/loginPage', {
      title: 'Login',
      error: req.query.error || null
    })
  }

  renderRegisterPage (req, res) {
    res.render('authenticate/registerPage', {
      title: 'Register',
      error: req.query.error || null
    })
  }

  renderIndexPage (req, res) {
    res.render('index', {
      title: 'Auth Portal',
      username: req.user.username
    })
  }
}