FROM python:3.12-slim
WORKDIR /app

# Copy on requirement.txt in current WORKDIR
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]