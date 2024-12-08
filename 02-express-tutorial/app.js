
const express = require('express')
const app = express()
const logger = require('./logger')
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");
const cookieParser = require("cookie-parser");

//apply logger for single route
app.get('/', logger, (req, res) => {
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})
app.get('/api/products', logger, (req, res) => {
  res.send('Products')
})

//apply logger globally
app.use(logger)
app.get('/',  (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})

//GET /api/v1/people request:
app.get('/api/v1/people', (req, res) => {
  res.json(people);
});

//POST request 
// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, person: name })
})
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
})

app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please Provide Credentials')
})

//PUT request
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})
//DELETE request
app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})

//refactoring
app.use("/api/v1/people", peopleRouter);

// middleware to parse cookies
app.use(cookieParser());

app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (!name) {
      return res.status(400).json({ success: false, message: "Please provide a name" });
  }
  res.cookie("name", name).status(201).json({ success: true, message: `Hello, ${name}` });
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name").json({ success: true, message: "Logged off" });
});

app.get("/test", (req, res, next) => {
  if (!req.cookies.name) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  res.json({ success: true, message: `Welcome, ${req.cookies.name}` });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000....')
})
