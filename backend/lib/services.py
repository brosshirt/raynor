import csv
import os
from dotenv import load_dotenv
load_dotenv()
from openai import OpenAI
import json
import logging
import asyncio
from pyppeteer import launch
from playwright.sync_api import sync_playwright
from datetime import datetime
import requests
from base64 import b64decode

from newspaper import Article
from bs4 import BeautifulSoup

SYSTEM_PROMPT = """
You will be given the text generated based on the html of a news article. 

Your task is to extract 4 pieces of information and return them in a JSON format. 

I want you to extract the title, authors, publication, and publication_date and return them in JSON. Do not, under any circumstances, return something that cannot be parsed directly into JSON. Don't respond with any conversational text. Do not respond with something wrapped in triple quotes. Your entire response must be valid JSON. 

title: This should be written exactly as it is in the article, unless the article has it in all caps, in which case you should capitalize it according to standard capitalization protocols for a new article
authors: This is a list of strings where the strings are the first and last names of the authors. The authors should always be in normal title case with the first letters of the first and last names capitalized. Do not put them in all caps even if they are that way in the article. If there are no listed human authors to the article, use your best judgment when selecting an author, it may be a group.
publication: the organization releasing the article
publication_date: Should be in a format like "July 8, 2024", ignore any time of day information. Do not confuse a date presented in the body of the article or as a caption to an image with the date of the article. Do not abbreviate the month of the date (always write Februrary instead of Feb).
"""



def get_openai_client():
    api_key = os.getenv('OPENAI_API_KEY')
    print('openapikey', api_key, flush=True)
    return OpenAI(api_key=api_key)

def get_gpt_news_info(article_text, client):
    chat_completion = client.chat.completions.create(messages=[{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": article_text}], model="gpt-3.5-turbo-0125")
    gpt_response = chat_completion.choices[0].message.content
    try:  
        return json.loads(gpt_response)
    except json.JSONDecodeError:
        raise Exception(f"Invalid GPT JSON: {gpt_response}")


def get_article_text(article_link, page):
    # # Disable images
    # page.route("**/*", lambda route, request: route.abort() if request.resource_type in ["image", "stylesheet", "font", "script"] else route.continue_())

    # page.goto(article_link)

    # html = page.content()

    try:
        api_response = requests.post(
            "https://api.zyte.com/v1/extract",
            auth=(os.getenv('ZYTE_API_KEY'), ""),
            json={
                "url": article_link,
                "httpResponseBody": True,
            },
        )

        html: bytes = b64decode(api_response.json()["httpResponseBody"])
    except Exception as e:
        logging.error(f"Error zyte api request: {str(e)}. Link: {article_link}")
        raise Exception(f"Error zyte api request: {str(e)}") 

    try:
        soup = BeautifulSoup(html, 'html.parser')
    except Exception as e:
        logging.error(f"Error parsing zyte html: {str(e)}. Link: {article_link}")
        raise Exception(f"Error parsing zyte html: {str(e)}") 

    return soup.get_text()


def log_error(error_type, publication, article_link, error_message, file_path='logs/logs.csv'):

    file_exists = os.path.isfile(file_path)
    with open(file_path, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # If it's a brand-new file, write the CSV header
        if not file_exists:
            writer.writerow(["error_type", "publication", "article_link", "error_message", "timestamp"])
        # Append the new error row
        writer.writerow([
            error_type,
            publication,
            article_link,
            error_message,
            datetime.now().isoformat(),
        ])
        