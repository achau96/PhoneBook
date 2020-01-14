const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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

/*
app.get('/', (request, response) => {
    response.send(`<h1>Welcome to Phonebook Server</h1>
    <a href="http://localhost:3001/api/persons">Click for list of persons</a>
    <p></p>
    <a href="http://localhost:3001/info">Click for info</a>`)
})
*/
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
  
app.get('/info', (request, response) => {
    var numOfPpl = persons.length;
    var date = new Date().toString();

    const output =  `<p>Phonebook has info for ${numOfPpl} people</p>
                    <p>${date}</p>`
        
    
    response.send(output)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    if(person)
    response.json(person) 
    else
    response.status(404).end()
   })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => Math.floor(Math.random()*100000)

app.post('/api/persons', (request,response) => {
    const person = request.body

    if(!person.name || !person.number){
      return response.status(400).json({
          error: 'missing name and/or number'
      })
    }

    persons.forEach(x => {
        if(x.name === person.name){
            return response.status(400).json({
                error: 'unique name required'
            })
        } 
    })
    const personData = {
        name: person.name,
        number: person.number,
        id: generateId()
    }

    persons = persons.concat(personData)
    response.json(persons)
   
})



const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })