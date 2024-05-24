FROM python:3.11.2

# Set environment variables to control Python behavior
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /code

# Copy the requirements file into the container at /code/
COPY requirements.txt /code/

# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /code/
COPY . /code/

# Expose the port on which your Django application will run (e.g., 8000)
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
