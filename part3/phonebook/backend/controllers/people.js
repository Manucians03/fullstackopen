const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (request, response, next) => {
    response.send('<h1>Phonebook</h1>')
    .catch(error => next(error))
  })
  
personRouter.get('/persons', (request, response, next) => {
    Person.find({}).then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})
  
personRouter.get('/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})
  
personRouter.delete('/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})
    
personRouter.post('/persons', (request, response, next) => {
    const body = request.body
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })
  
personRouter.put('/persons/:id', (request, response, next) => {
    const body = request.body
    Person.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})
  
module.exports = personRouter