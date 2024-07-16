from lib.services import get_openai_client, get_gpt_news_info, get_article_text
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import logging


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
@app.route('/clip-format', methods=['POST'])
def clip_format():
    article_link = request.json.get('article_link', '')
    
    try:
        # Plain text representing the news article
        article_text = get_article_text(article_link)

        # Title, author, publication, publication_date, and link
        result = get_gpt_news_info(article_text, openai_client)
        result["article_link"] = article_link

        return jsonify(result)
    except Exception as e:
        logging.error(f"Error clip-format: {str(e)}, Link: {article_link}")
        return jsonify({"error": str(e)}), 400
    

if __name__ == '__main__':
    app.run(debug=True)