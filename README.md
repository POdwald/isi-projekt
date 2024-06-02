# Django REST Framework React Project

Welcome to the Django REST Framework React Project! This project aims to replicate the functionality and design of platforms like Coursera, providing a comprehensive REST API built with Django, coupled with a React frontend.

## Running the Project

To run the project, follow these steps:

1. Ensure Docker is installed and project's containers are running.

2. Open a terminal or command prompt.

3. Navigate to the root directory of the project.

4. Run the following command to start the project:

   ```bash
   $ docker-compose up

## Adding Sample Data for Courses

To enrich your database with sample course data within a Docker container, follow these steps:

1. Ensure Docker is installed and the project's containers are running.

2. Open a terminal or command prompt.

3. Access the shell of the Django backend container:

   ```bash
   $ docker exec -ti isi-projekt-backend-1 sh
   ```

4. Execute the Python script `add_sample_data.py` to populate the database with sample course data:

   ```bash
   $ python manage.py shell < myproject/scripts/add_sample_data.py
   ```

   (OPTIONAL) To create a superuser account for administrative purposes, run:

   ```bash
   $ python manage.py createsuperuser
   ```

   Follow the prompts to set up the superuser account.

5. Once the script executes successfully, exit the container shell:

   ```bash
   $ exit
   ```
