const bodyParser = require('body-parser')
const session = require('express-session')
const express = require('express')
const faker = require('faker')
const router = require('express').Router()
const app = express()
app.use(bodyParser.json())
// session middleware
app.use(
  session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
)
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})
router.post('/news', (req, res) => {
  const news = {}
  for (let i = 0; i < 10000; i++) {
    const feedItemId = faker.random.uuid().replace(/-/g, '')
    news[feedItemId] = {
      feedItemId,
      pubdate: faker.date.recent(),
      link: faker.internet.url(),
      title: faker.lorem.words(20),
      summary: faker.lorem.paragraphs(5),
      author: faker.name.firstName() + ' ' + faker.name.lastName(),
      feedId: faker.random.number(1000)
    }
  }
  res.json(news)
})
app.use('/api', router)
module.exports = app
