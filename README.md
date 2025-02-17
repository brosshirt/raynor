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
1. Try to fix the errors with the publications listed below, make a google doc
2. Meet with Aaron and talk about next steps

#### What was actually requested

1. Try to fix errors associated with the following publications
    - Financial Times (example article: https://www.ft.com/content/866f33ef-cbb9-4cab-a420-9360d2d9d02d) - Paywall, no short term solution
    - The Hill (ex: https://thehill.com/policy/technology/5110250-openai-announces-new-chatgpt-version-for-government-agencies/) - "Press and hold to confirm you are a human"
    - The Information (ex: https://www.theinformation.com/articles/openai-ceo-says-board-will-reject-musks-97-billion-offer) - "Enable Javascript and Cookies", weirdly works some of the time
    - The Wall Street Journal (ex: https://www.wsj.com/video/series/in-depth-features/ftc-chair-lina-khans-exit-interview-i-hope-we-dont-see-backsliding/96239EA6-7C22-40E2-A0F0-6CF101DCDAC8) - "Please enable JS and disable any ad blocker"
    - Fortune - (ex: https://fortune.com/2025/01/08/texas-ai-bill-traiga-hb-1709-capriglione-colorado-ai-regulation/) - It weirdly fucks up the date, the article_text returned in playwright is not what we see as a user and it does not contain the date
    - Reuters (ex: https://www.reuters.com/legal/government/google-loses-bid-dismiss-us-states-lawsuit-over-digital-ads-2025-01-29/) - "Please enable JS and disable any ad blocker"
    - Bloomberg (ex: https://www.bloomberg.com/news/articles/2025-02-05/china-weighs-investigating-apple-over-app-store-policies-fees-including-30-cut) - "Are you a robot?... Please make sure your browser supports JavaScript and cookies"
2. Improve the UI, add a logo (done)
3. Add a domain and https (done)
4. Error reporting (done, could be improved)√

#### Down the line

1. Do an analysis and try to speed up getting the clips, see where the bottleneck is
2. Article summary functionality
3. RAG feature where you can ask questions about your documents
4. Storage for the clips, generate the full clips all at once
5. Improved error reporting, add a message
