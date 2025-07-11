# TODO App

## Steps to Get Everything Working

### 1️⃣ Set Up the Database

From the terminal, run the script:

```bash
cd TODO-APP/
sh createDB.sh
```

You will be asked for your MySQL root user password.  
This will create the necessary database and table.

> ⚠️ **IMPORTANT:** After this step, open the file `backend/DbConnection.py` and edit the line:

```python
password=""
```

Put your MySQL root password inside the quotes.

---

### 2️⃣ Set Up the Backend

Go to the backend folder:

```bash
cd backend/
```

Install the dependencies:

```bash
poetry install
```

Activate the environment:

```bash
poetry shell
```

Run the server:

```bash
poetry run uvicorn main:app --reload
```

The backend will be listening by default at:  
[http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 3️⃣ Set Up the Frontend

In another terminal (in the project root or in the frontend folder if separated):

```bash
npm install

# Development
npm run dev
# Production
npm start

```

This will start the React development server at:  
[http://localhost:3000](http://localhost:3000)

---

## Dependencies

- [Node.js and npm](https://nodejs.org/) (for the frontend)
- [Poetry](https://python-poetry.org/) (for Python dependency management)
- [MySQL](https://www.mysql.com/) (you need access to a root user)
- [React](https://react.dev/) (frontend framework)
- [FastAPI](https://fastapi.tiangolo.com/) (backend)
