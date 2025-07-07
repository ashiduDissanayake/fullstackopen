const express = require("express");
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

const persons = [
    {
      id: "1",
      name: "Arto Hellas",
      number: "040-123456",
    },
    {
      id: "2",
      name: "Ada Lovelace",
      number: "39-44-5323523",
    },
    {
      id: "3",
      name: "Dan Abramov",
      number: "12-43-234345",
    },
    {
      id: "4",
      name: "Mary Poppendieck",
      number: "39-23-6423122",
    },
  ];

app.get("/", (request, response) => {
  response.send("<h1> Hello world! </h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
    const date = new Date();
    const personCount = persons.length;
    response.send(
        `<p>Phonebook has info for ${personCount} people</p>` +
        `<p>${date}</p>`
    )
})

app.get("/api/persons/:id", (request, response) => {
    const { id } = request.params;

    const person = persons.find((p) => p.id === id);

    if (!person) {
        return response.status(404).send("Person not found");
    }

    response.json(person);
})

app.delete("/api/persons/:id", (request, response) => {
    const { id } = request.params;

    const personIndex = persons.findIndex((p) => p.id === id);

    if (personIndex === -1) {
        return response.status(404).send("Person not found");
    }

    persons.splice(personIndex, 1);
    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const { name , number} = request.body;

    if (!name || !number) {
        return response.status(400).json({
            error: "Name and number are required"
        });
    }

    if (persons.some((p) => p.name === name)) {
        return response.status(400).json({
            error: "Name must be unique"
        });
    }

    const newPerson = {
        id: Math.random().toString(36).substring(2, 9), // Generate a random ID
        name,
        number
    };

    persons.push(newPerson);
    response.status(201).json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
