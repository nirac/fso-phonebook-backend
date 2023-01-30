require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const app = express();
const Person = require('./modules/person');

/* let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];
 */
app.use(cors());
app.use(express.json());
app.use(express.static('build'));


morgan.token('body', req => {
    return JSON.stringify(req.body)
  });

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/', (request,response)=>{
    response.send('<h1>Phonebook</h1>')
});

/*
app.get('/info', (request, response)=>{   
    const entries = persons.length;
    const date = new Date(); 
    response.send(`<p>Phonebook has info for ${entries} people</p><p>${date.toString()}</p>`)
});
*/
app.get('/api/persons', (request, response)=>{
    Person.find({}).then(people => {
        response.json(people);
    })
});

app.get('/api/persons/:id', (request, response)=>{
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})
/* 
const generateId = () => {
    let newId = Math.floor(Math.random()*10000);
    const checkId = persons.includes(newId) ? generateId():newId;
    console.log(newId)
    return newId;
};
 */
app.post('/api/persons', (request, response) =>{
    const body = request.body;
    console.log(22, request.headers);
    console.log(33, body)

    if(!body.name) {
        return response.status(400).json({
            error:'name is missing'
        })
    }else if(!body.number){
        return response.status(400).json({
            error:'number is missing'
        })
    }/* else if(persons.some(p => p.name === body.name)){
        return response.status(400).json({
            error:'name must be unique'
        })
    } */

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})



app.delete('/api/persons/:id', (request, response)=> {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
    //.catch(error => next(error))
    /* const id= Number(request.params.id);
    persons = persons.filter(person => person.id!= id);

    response.status(204).end(); */
})

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});
