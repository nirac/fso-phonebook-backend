
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false);
mongoose.connect(url)
    .then(result =>{
        console.log('connected to database')
    })
    .catch(error => {
        console.log('error connecting to database', error.message)
    });

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema);