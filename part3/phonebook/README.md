# Phonebook Application

A full-stack phonebook application built as part of the Full Stack Open course (Part 3). The app allows users to manage contacts by adding, updating, deleting, and searching through a contact list. It includes a frontend built with React and a backend powered by Node.js and Express.

> **Live Demo**: [https://fullstackopen-production-cb64.up.railway.app/](https://fullstackopen-production-cb64.up.railway.app/)

---

## Features

* Add new contacts with name and phone number
* Update existing contact numbers
* Delete contacts from the phonebook
* Real-time search/filter functionality
* Backend validation for unique names and required fields
* Logging with Morgan middleware
* Custom error handling for clean responses
* Environment variable configuration using `.env`
* Fully deployable on cloud platforms like Railway or Render

---

## Technologies Used

### Frontend

* React
* Axios
* CSS (basic styling)

### Backend

* Node.js
* Express
* Morgan
* CORS
* dotenv
* nodemon (for development)

---

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ashiduDissanayake/fullstackopen.git
```

### 2. Navigate to Part 3 (Phonebook)

```bash
cd fullstackopen/part3/phonebook
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Run the Backend Server

```bash
npm run dev
```

The server will start on `http://localhost:3001` by default.

---

## Frontend Setup (Optional if you only need the backend)

The frontend can be found in `fullstackopen/part2/phonebook`.

```bash
cd ../../part2/phonebook
npm install
npm start
```

Runs on `http://localhost:3000`

---

## Usage

1. Open the app in your browser:

   * `http://localhost:3000` *(Frontend)*
   * `http://localhost:3001/api/persons` *(Backend API)*

2. Use the form to add a new contact.

3. Use the search field to filter contacts by name.

4. Click the "Delete" button to remove a contact.

5. If a contact already exists, you'll be prompted to update the number.

---

## API Endpoints

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | `/api/persons`     | Retrieve all contacts        |
| GET    | `/info`            | Show total contacts and date |
| GET    | `/api/persons/:id` | Get a specific contact by ID |
| POST   | `/api/persons`     | Add a new contact            |
| PUT    | `/api/persons/:id` | Update an existing contact   |
| DELETE | `/api/persons/:id` | Delete a contact by ID       |

---

## Environment Variables

Create a `.env` file in the root of the backend project:

```env
PORT=3001
```

---

## Logging

The app uses **Morgan** middleware with the `'tiny'` configuration to log concise HTTP request data to the console.

In `index.js`:

```js
const morgan = require('morgan')
app.use(morgan('tiny'))
```

---

## Error Handling

All API errors (e.g., missing fields, validation errors) are caught and returned as proper JSON messages using centralized error handling middleware.

---

## Deployment

To deploy the backend:

1. Push the backend to GitHub.
2. Deploy to platforms like [Railway](https://railway.app), [Render](https://render.com), or [Heroku](https://heroku.com).
3. Set the `PORT` environment variable on your deployment service.
4. Connect your React frontend to the deployed backend URL.

---

## Contributing

Contributions are welcome! If you have suggestions for features or find bugs, feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit
4. Push and submit a pull request

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contact

* GitHub: [ashiduDissanayake](https://github.com/ashiduDissanayake)
* Email: \[[your-email@example.com](mailto:your-email@example.com)] *(replace this with your actual email)*

---

## Acknowledgments

* Thanks to the [Full Stack Open](https://fullstackopen.com/) course team for providing an excellent curriculum.
* Gratitude to the open-source community for tools and libraries that make this project possible.

---

## Future Improvements

* Implement user authentication
* Integrate a database (e.g., MongoDB or PostgreSQL)
* Enhance frontend design with a UI framework (e.g., Material UI or Tailwind)
* Add unit and integration tests
* Implement pagination and sorting
* Add CSV import/export support
* Mobile responsiveness and offline capabilities
* Add dark mode and theme toggling
