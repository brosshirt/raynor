import os
from dotenv import load_dotenv
load_dotenv()
from openai import OpenAI
import json

from newspaper import Article
from bs4 import BeautifulSoup

SYSTEM_PROMPT = """
You will be given the text generated based on the html of a news article. 

Your task is to extract 4 pieces of information and return them in a JSON format. 

I want you to extract the title, authors, publication, and publication_date and return them in JSON. Do not, under any circumstances, return something that cannot be parsed directly into JSON. Don't respond with any conversational text.

title: This should be written exactly as it is in the article, unless the article has it in all caps, in which case you should use capitalize it according to standard capitalization protocols for a new article
authors: This is a list of strings where the strings are the first and last names of the authors. The authors should always be in normal title case with the first letters of the first and last names capitalized. Do not put them in all caps even if they are that way in the article.
publication: the organization releasing the article
publication_date: Should be in a format like "July 8, 2024", ignore any time of day information
"""


def get_openai_client():
    api_key = os.getenv('OPENAI_API_KEY')
    return OpenAI(api_key=api_key)

def get_gpt_news_info(article_text, client):
    chat_completion = client.chat.completions.create(messages=[{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": article_text}], model="gpt-3.5-turbo-0125")
    return json.loads(chat_completion.choices[0].message.content)

def get_article_text(article_link):
    # Get the article from the link
    article = Article(article_link)
    article.download()
    article.parse()

    # Parse the text from the article
    soup = BeautifulSoup(article.html, 'html.parser')
    return soup.get_text()
