const mongoose = require('mongoose');

if(process.argv.length<3){
    console.log('give password as argument or password name number');
    process.exit(1)
}

const password = process.argv[2];
console.log(1111, password)
const url = `mongodb+srv://fullstack:${password}@cluster0.3f6ggqz.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema);


if(process.argv.length === 3){
    console.log('Phonebook:')
    Person.find({}).then(result =>{
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close();
    })
}

if(process.argv.length > 3){
    const name = process.argv[3];
    const number = process.argv[4];
    
    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    })
}
