# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
# Needs to happen before copying everything else so that you don't reinstall everything after each code change
COPY requirements.txt .

# Install the Python dependencies
# Imperfect dependency management, you want to use dependency caching so you don't reinstall every dependency after each patch
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install playwright
RUN playwright install --with-deps chromium

RUN pip install gunicorn

# Copy the rest of the application code into the container
COPY . .

# Command to run the application
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]