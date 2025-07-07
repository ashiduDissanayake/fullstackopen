const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://ashidudissanayake1:${password}@cluster0.z2dtsps.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`


if (process.argv.length > 3 && process.argv.length < 6) {
    const name = process.argv[3]
    const number = process.argv[4]

    mongoose.set('strictQuery',false)

    mongoose.connect(url)

    const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

    const Contact = mongoose.model('Contact', contactSchema)

    const contact = new Contact({
    name: name || 'Arto Hellas',
    number: number || '123-456-7890',
    })

    contact.save().then(result => {
    console.log(`added ${contact.name} number ${contact.number} to phonebook`)
    mongoose.connection.close()
    })
}else if (process.argv.length === 3) {
    mongoose.set('strictQuery',false)

    mongoose.connect(url)

    const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

    const Contact = mongoose.model('Contact', contactSchema)

    Contact.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
} else {
    console.log('Invalid number of arguments')
    process.exit(1)
}