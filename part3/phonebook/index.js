const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const Contact = require("./models/contact");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("dist"));

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  Contact.countDocuments().then((personCount) => {
    response.send(
      `<p>Phonebook has info for ${personCount} people</p>` + `<p>${date}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;

  Contact.findById(id)
    .then((person) => {
      if (!person) {
        return response.status(404).send("Person not found");
      }
      response.json(person);
    })
    .catch((error) => {
      console.error("Error fetching person:", error);
      response.status(500).send("Internal server error");
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;

  Contact.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.error("Error deleting person:", error);
      response.status(500).send("Internal server error");
    });
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "Name and number are required",
    });
  }
  const newPerson = new Contact({
    name,
    number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
    })
    .catch((error) => {
      console.error("Error saving person:", error);
      response.status(500).send("Internal server error");
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
