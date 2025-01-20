# raynor

## Suite for all Raynor Ave tools

### Next step: Set up a scheme for getting error reports. The goal is for Aaron to press a button to highlight problematic links and for me to receive a neat list of the links that didn't work and any notes about what the error might be. Come up with just the backend for now and put some shitty UI on it. We'll have a clearer picture of what the UI should be later. 

## Build Instructions

### Frontend (Dev)

1. npm install
2. npm start

### Backend (dev)

1. python3 -m venv venv
2. source venv/bin/activate
3. pip install -r requirements.txt
4. playwright install
5. Add env vars
6. python3 app.y

### Prod (https://docs.google.com/document/d/1ghUJv6EfXdU3tyO3s21-CyBmL72Ci2xgJ8QZO4y3h3k/edit?usp=sharing)

1. Set your REACT_APP_BACKEND_URL in frontend/.env.production to the lightsail IP
2. Set the right API key in backend/.env
3. add logs/logs.csv to your backend in production 
4. docker-compose up --build 

#### Next steps
1. Set up https
2. Come up with a UI that meets current requirements but is extendable
    - Need to get tailwind set up
    - Hard to strike balance between getting it done and learning
3. Get a logo

#### What was actually requested

1. Try to fix errors associated with the following publications
    - Financial Times
    - The Hill
    - The Information
    - The Wall Street Journal
    - Fortune
    - Reuters
    - Bloomberg 
2. Improve the UI, add a logo
3. Add a domain and https
4. Error reporting

#### Down the line

1. Article summary functionality
2. RAG feature where you can ask questions about your documents
3. Storage for the clips, generate the full clips all at once
