from lib.services import get_openai_client, get_gpt_news_info, get_article_text, log_error
from flask import Flask, request, jsonify, send_from_directory, send_file
import os
from flask_cors import CORS
import logging
from datetime import datetime





# Initialize browser
from playwright.sync_api import sync_playwright

before_browser_launch = datetime.now()
playwright = sync_playwright().start()
browser = playwright.chromium.launch(headless=True)
# browser = playwright.chromium.connectOverCDP('wss://browser.zenrows.com?apikey=f81845d18c9e2a2923b563231f53513d90403f5f')
context = browser.new_context(user_agent="Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.17 Safari/537.36", java_script_enabled=True)
page = context.new_page()
print("Time to load initial page ", datetime.now() - before_browser_launch, flush=True)

logging.basicConfig(filename='app.log', level=logging.ERROR)

openai_client = get_openai_client()

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)  # Enable CORS for all routes

# Serve the appropriate webpage based on the react app
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    # Serve the file (if exists) from the build folder
    return send_from_directory(app.static_folder, path)

# API
@app.route('/api/error', methods=['GET'])
def get_errors():
    if not os.path.exists('logs/logs.csv'):
        return jsonify({'error': 'logs/logs.csv is missing on backend'}), 500

    return send_file(
        'logs/logs.csv',
        as_attachment=True,
        mimetype='text/csv',
        download_name= 'error_logs.csv'
    )




@app.route('/api/error', methods=['POST'])
def report_error():
    try:
        data = request.json

        
        error_type = data.get('error_type', '')
        publication = data.get('publication', '')
        article_link = data.get('article_link', '')
        error_message = data.get('error_message', '')

        log_error(error_type, publication, article_link, error_message)
        return jsonify({"success": True})
    except Exception as e:
        logging.error(f"Error report-error: {str(e)}, Link: {article_link}")
        return jsonify({"error": str(e)}), 400


@app.route('/api/clip-format', methods=['POST'])
def clip_format():
    print('POST clip-format')
    
    article_link = request.json.get('article_link', '')

    
    try:
        # Plain text representing the news article
        article_text = get_article_text(article_link, page)

        # Title, author, publication, publication_date, and link
        result = get_gpt_news_info(article_text, openai_client)

        result["article_link"] = article_link

        return jsonify(result)
    except Exception as e:
        logging.error(f"Error clip-format: {str(e)}, Link: {article_link}")
        return jsonify({"error": str(e)}), 400
    

if __name__ == '__main__':
    app.run(debug=True, threaded=False, use_reloader=False) # use_reloader=False is critical for single_thread use and compatibility with sync.playwright


# Don't forget to close the browser when the app stops
# @app.teardown_appcontext
# def cleanup(exception=None):
#     print('SHUTTING THE BROWSER AND PLAYWRIGHT DOWN', flush=True)
#     browser.close()
#     playwright.stop()

# This is commented out because in production it runs after each request, so the first request will work and then they will all fail