// Function to show error message
function showError(message) {
  const errorDisplay = document.getElementById('errorDisplay')
  errorDisplay.textContent = message
  errorDisplay.style.display = 'block'
}

// Function to show success message
function showSuccess(message) {
  const errorDisplay = document.getElementById('errorDisplay')
  errorDisplay.textContent = message
  errorDisplay.style.display = 'block'
  errorDisplay.style.color = 'green'
}

// Registration Form Validation
function validateRegistrationForm(event) {
  // Prevent form from submitting normally
  event.preventDefault()

  // Get the form being submitted
  const form = event.target

  // Get form elements
  const username = form.querySelector('input[name="username"]')
  const email = form.querySelector('input[name="email"]')
  const password = form.querySelector('input[name="password"]')
  const passwordCheck = form.querySelector('input[name="passwordCheck"]')
  const terms = form.querySelector('input[name="terms"]')

  // Username Validation
  /*The username cannot be blank.
  The username must be at least four characters long.
  The username must contain at least two unique characters.
  The username cannot contain any special characters or whitespace.*/
  if (username.value.trim() === '') {
      showError('Username cannot be blank')
      username.focus()
      return false
  }

  if (username.value.length < 4) {
      showError('Username must be at least 4 characters long')
      username.focus()
      return false
  }

  const uniqueChars = new Set(username.value.toLowerCase())
  if (uniqueChars.size < 2) {
      showError('Username must contain at least 2 unique characters')
      username.focus()
      return false
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/
  if (!usernameRegex.test(username.value)) {
      showError('Username cannot contain special characters or whitespace')
      username.focus()
      return false
  }

  // Email Validation
  /*The email must be a valid email address.
  The email must not be from the domain "example.com."*/
  if (email.value.trim() === '') {
      showError('Email cannot be blank')
      email.focus()
      return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
      showError('Email must be a valid email address')
      email.focus()
      return false
  }

  if (email.value.toLowerCase().endsWith('@example.com')) {
      showError('Email cannot be from the domain "example.com"')
      email.focus()
      return false
  }

  // Password Validation
  /*Passwords must be at least 12 characters long.
  Passwords must have at least one uppercase and one lowercase letter.
  Passwords must contain at least one number.
  Passwords must contain at least one special character.
  Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
  Passwords cannot contain the username.
  Both passwords must match.*/

  if (password.value.trim() === '') {
      showError('Password cannot be blank')
      password.focus()
      return false
  }

  if (password.value.length < 12) {
      showError('Password must be at least 12 characters long')
      password.focus()
      return false
  }

  const uppercaseRegex = /[A-Z]/
  const lowercaseRegex = /[a-z]/
  const numberRegex = /[0-9]/
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/

  if (!uppercaseRegex.test(password.value)) {
      showError('Password must have at least one uppercase letter')
      password.focus()
      return false
  }

  if (!lowercaseRegex.test(password.value)) {
      showError('Password must have at least one lowercase letter')
      password.focus()
      return false
  }

  if (!numberRegex.test(password.value)) {
      showError('Password must contain at least one number')
      password.focus()
      return false
  }

  if (!specialCharRegex.test(password.value)) {
      showError('Password must contain at least one special character')
      password.focus()
      return false
  }

  if (password.value.toLowerCase().includes('password')) {
      showError('Password cannot contain the word "password"')
      password.focus()
      return false
  }

  if (password.value.toLowerCase().includes(username.value.toLowerCase())) {
      showError('Password cannot contain the username')
      password.focus()
      return false
  }

  if (password.value !== passwordCheck.value) {
      showError('Passwords do not match')
      passwordCheck.focus()
      return false
  }

  // Terms and Conditions Validation
  //The terms and conditions must be accepted.
  if (!terms.checked) {
      showError('You must agree to the Terms of Use')
      terms.focus()
      return false
  }

  // Store user data in localStorage
  /*If all validation is successful, store the username, email, and password using localStorage.
  Valid usernames should be converted to all lowercase before being stored.
  Valid emails should be converted to all lowercase before being stored.
  Clear all form fields after successful submission and show a success message.*/
  const userData = {
      username: username.value.toLowerCase(),
      email: email.value.toLowerCase(),
      password: password.value
  }

  localStorage.setItem(username.value.toLowerCase(), JSON.stringify(userData))

  // Clear form fields and show success message
  form.reset()
  showSuccess('Registration successful')
  return false
}

// Login Form Validation
function validateLoginForm(event) {
  // Prevent form from submitting normally
  event.preventDefault()

  // Get the form being submitted
  const form = event.target

  // Get form elements
  const username = form.querySelector('input[name="username"]')
  const password = form.querySelector('input[name="password"]')
  const persist = form.querySelector('input[name="persist"]')

  // Username Validation
  if (username.value.trim() === '') {
      showError('Username cannot be blank')
      username.focus()
      return false
  }

  const userData = localStorage.getItem(username.value.toLowerCase())
  if (!userData) {
      showError('Username does not exist')
      username.focus()
      return false
  }

  // Password Validation
  if (password.value.trim() === '') {
      showError('Password cannot be blank')
      password.focus()
      return false
  }

  const parsedUserData = JSON.parse(userData)
  if (password.value !== parsedUserData.password) {
      showError('Incorrect password')
      password.focus()
      return false
  }

  // Clear form fields and show success message
  /*If all validation is successful, clear all form fields and show a success message.
  If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies).*/
  form.reset()
  let successMessage = 'Login successful'
  if (persist.checked) {
      successMessage += ' (Keep me logged in)'
  }
  showSuccess(successMessage)
  return false
}

//event listeners to forms
document.getElementById('registration').addEventListener('submit', validateRegistrationForm)
document.getElementById('login').addEventListener('submit', validateLoginForm)


