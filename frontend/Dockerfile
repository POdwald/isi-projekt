# Use a base image for your frontend (e.g., Node.js)
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which your frontend application will run (e.g., 3000)
EXPOSE 3000

# Command to run your frontend application (adjust as needed)
CMD ["npm", "start"]
