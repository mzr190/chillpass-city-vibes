# Chillpass City Vibes

This project contains a small React frontend and FastAPI backend. To preview the
site locally you can run a lightweight API that serves sample event data.

## Running the local API

1. Install Python requirements:

   ```bash
   pip install -r backend/requirements.txt
   ```

2. Start the API server:

   ```bash
   python backend/local_api.py
   ```

   The API will be available at `http://localhost:8000`.

## Running the frontend

1. Ensure `frontend/.env` points to the local API (already configured by
   default).
2. Install dependencies and start the development server:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Open the printed URL in your browser to see the site using the local API.
