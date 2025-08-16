# Peppo AI Video Generation Challenge

This is a minimal web application that generates a short video based on a user's text prompt. This project was built to demonstrate AI model integration, cloud deployment, and code quality.

**Live Application Link:** https://peppo-challenge-nbqr.vercel.app/

---

## Key Features

* User-friendly interface to input a text prompt.
* Simulated video generation process.
* Displays the final video in the browser.

---

## Tech Stack

* **Frontend:** React.js
* **Backend:** Python (Flask)
* **Deployment:** Render

---

## Mock API Implementation

Per the challenge's pro tips, this application uses a mock backend to ensure functionality and stability. The API calls to a live AI service have been replaced with a placeholder that simulates a 5-second processing time and returns a sample video. This guarantees the application is fully functional end-to-end.

---

## Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/udaykiran-29/peppo-challenge
    cd peppo
    ```

2.  **Set up the backend:**
    ```bash
    # Navigate to the backend folder and create a virtual environment
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

    # Install Python dependencies
    pip install -r requirements.txt

    # Run the Flask server
    python app.py
    ```

3.  **Set up the frontend:**
    ```bash
    # Open a new terminal and navigate to the client folder
    cd client

    # Install Node.js dependencies
    npm install

    # Run the React development server
    npm start
    ```

The app will be available at `http://localhost:3000`.
