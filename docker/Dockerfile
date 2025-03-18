FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["gunicorn", "startup_project.wsgi:application", "--bind", "0.0.0.0:8000"]
