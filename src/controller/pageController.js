/**
 * Page Controller
 */

/**
 * Renders the home page
 */
export const renderHomePage = (req, res) => {
  res.render('index', { 
    title: 'Home',
    error: req.query.error || null
  })
}

/**
 * Renders the login page
 */
export const renderLoginPage = (req, res) => {
  res.render('authenticate/loginPage', { 
    title: 'Login',
    error: req.query.error || null
  })
}

/**
 * Renders the registration page
 */
export const renderRegisterPage = (req, res) => {
  res.render('authenticate/registerPage', { 
    title: 'Register',
    error: req.query.error || null
  })
}