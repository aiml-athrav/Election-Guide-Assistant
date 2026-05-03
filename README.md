# Election Guide AI Assistant

A fully functional, AI-powered election guide web application. This project uses Python (Flask) for the backend and a modern HTML/CSS/JS frontend with a premium glassmorphism UI. It integrates the Google Gemini API to act as a helpful, neutral election guide.

## Features
- **AI Chatbot**: Ask questions about the election process, voting methods, and get beginner-friendly answers.
- **Election Timeline**: Visual guide of the general election process.
- **Eligibility Checker**: Quick interactive tool to check if you are eligible to vote.
- **Modern UI**: Fully responsive, dark-themed interface with glassmorphism effects.

## Prerequisites
- **Python**: You must have Python installed. Download it from [python.org](https://www.python.org/downloads/). (Make sure to check the box "Add Python to PATH" during installation).
- **Gemini API Key**: Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## Installation & Setup Guide (Windows)

Follow these step-by-step instructions to get the application running on your computer.

### Step 1: Open the Project
Open your Command Prompt (cmd) or PowerShell, and navigate to this project's folder:
```cmd
cd path\to\this\folder
```

### Step 2: Create a Virtual Environment
It's a best practice to use a virtual environment to manage project dependencies. Run this command to create one:
```cmd
python -m venv venv
```

### Step 3: Activate the Virtual Environment
Before installing packages, you must activate the virtual environment:
```cmd
venv\Scripts\activate
```
*(You should see `(venv)` appear at the beginning of your command prompt line).*

### Step 4: Install Requirements
Install Flask and the Gemini API package using pip:
```cmd
pip install -r requirements.txt
```

### Step 5: Setup API Key
1. In the project folder, locate the file named `.env.example`.
2. Rename this file to exactly `.env`.
3. Open the `.env` file in any text editor and replace `your_api_key_here` with your actual Google Gemini API key.

```env
GEMINI_API_KEY=AIzaSy...your_actual_key...
```

### Step 6: Run the Application
Start the Flask server with the following command:
```cmd
python app.py
```

### Step 7: Access the App
Open your web browser (Chrome, Edge, Firefox) and go to:
[http://localhost:5000](http://localhost:5000)

---

## Testing the Application

1. **Eligibility Check**: Click on the "Eligibility Checker" tab on the left, enter your age and citizenship status, and click "Check Eligibility".
2. **AI Chat**: On the right side, type a question like "How do I register to vote?" and hit send. The AI should reply shortly.

## Troubleshooting

- **Error: `ModuleNotFoundError: No module named 'flask'`**
  - **Fix**: You forgot to activate your virtual environment or install dependencies. Run `venv\Scripts\activate` then `pip install -r requirements.txt`.
- **Error: `Gemini API Key is not configured` in Chat**
  - **Fix**: Make sure you renamed `.env.example` to `.env` and that your API key is correctly pasted inside it without quotes.
- **Python is not recognized as an internal or external command**
  - **Fix**: Python is not installed, or not added to your system PATH. Reinstall Python and check the "Add to PATH" option.
