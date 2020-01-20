require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const assignBody = (request, response, next) => {
  body = request.body
  next()
}

morgan.token('body', function assignBody(){
return JSON.stringify(body)
})

app.use(bodyParser.json())
app.use(assignBody)
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
/*
let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
*/
/*
app.get('/', (request, response) => {
    response.send(`<h1>Welcome to Phonebook Server</h1>
    <a href="http://localhost:3001/api/persons">Click for list of persons</a>
    <p></p>
    <a href="http://localhost:3001/info">Click for info</a>`)
})
*/
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person.map(person => person.toJSON()))
  });
});
  
app.get('/info', (request, response) => {
  
  Person.countDocuments({}, function (err,count){
  var date = new Date().toString();
  const output =  `<p>Phonebook has info for ${count} people</p>
  <p>${date}</p>`
  if(err){
    console.log('Error')
  }
  else{        
    response.send(output)
  }})
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if(person)
    response.json(person) 
    else
    response.status(404).end()
    })
    .catch(error => next(error))
    
   })

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body

  const personData = {
    name: person.name,
    number: person.number,
  }

  Person.findByIdAndUpdate(request.params.id, personData, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request,response) => {
    const person = request.body

    if(!person.name || !person.number){
      return response.status(400).json({
          error: 'missing name and/or number'
      })
    }

    Person.find({}).then(people => {
      people.map(persons => persons.name === person.name ? 
        response.status(400).json({error: 'unique name required'}) : null
      )})

    const personData = new Person({
        name: person.name,
        number: person.number,
    })

    personData.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })