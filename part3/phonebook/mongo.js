const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://ashidudissanayake1:${password}@cluster0.z2dtsps.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

mongoose.set('strictQuery', false)

if (process.argv.length === 3) {
  mongoose.connect(url)
    .then(() => Contact.find({}))
    .then(result => {
      console.log('phonebook:')
      result.forEach(contact => {
        console.log(`${contact.name} ${contact.number}`)
      })
      return mongoose.connection.close()
    })
    .catch(error => {
      console.error('Error fetching contacts:', error.message)
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  mongoose.connect(url)
    .then(() => {
      const contact = new Contact({ name, number })
      return contact.save()
    })
    .then(savedContact => {
      console.log(`added ${savedContact.name} number ${savedContact.number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch(error => {
      console.error('Error saving contact:', error.message)
      mongoose.connection.close()
    })
} else {
  console.log('Invalid number of arguments')
  process.exit(1)
}