import os
from flask import Flask, render_template, request, jsonify
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    client = genai.Client(api_key=API_KEY)
else:
    client = None
    print("WARNING: GEMINI_API_KEY not found in environment variables.")

# System prompt to ensure the AI acts as an Election Guide and remains neutral
SYSTEM_PROMPT = """You are a helpful, neutral, and informative Election Guide AI Assistant. 
Your goal is to explain the election process, timeline, eligibility criteria, and help users understand how to vote.
You must remain completely neutral and objective. Do not endorse any political party, candidate, or ideology.
Explain concepts in a simple, beginner-friendly way. If a user asks a complex question, break it down into easy steps."""

def get_gemini_response(user_message):
    try:
        if not client:
            return "Error: Gemini API Key is not configured. Please check your .env file."
        
        # Combine system prompt with user message
        full_prompt = f"{SYSTEM_PROMPT}\n\nUser: {user_message}\nAssistant:"
        
        # Using gemini-flash-latest as it often has better availability on free tier
        response = client.models.generate_content(
            model='gemini-flash-latest',
            contents=full_prompt,
        )
        
        if response and response.text:
            return response.text
        else:
            return "The AI returned an empty response. Please try again."
            
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            return "Error: API Quota exceeded. Please wait a moment or check your Gemini API billing/quota settings."
        elif "401" in error_msg or "403" in error_msg:
            return "Error: Invalid API Key. Please ensure your GEMINI_API_KEY is correct in the .env file."
        elif "404" in error_msg:
            return f"Error: Model not found. The configured model might not be available for your API key."
        return f"Error communicating with AI: {error_msg}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'Message is required'}), 400
        
    ai_response = get_gemini_response(user_message)
    
    return jsonify({
        'response': ai_response
    })

import threading
import webbrowser

if __name__ == '__main__':
    import socket
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    print("Starting Election Guide AI Assistant...")
    print(f"Access the application at: http://{local_ip}:5000 (Use this on your mobile!)")
    print("Opening browser automatically on this computer...")
    
    # Auto-open browser (preventing double open from debug reloader)
    if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        threading.Timer(1.5, lambda: webbrowser.open(f'http://127.0.0.1:5000/')).start()
        
    app.run(debug=True, port=5000, host='0.0.0.0')
