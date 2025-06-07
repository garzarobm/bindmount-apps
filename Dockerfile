# # syntax=docker/dockerfile:1
# FROM ubuntu:latest
# COPY my_main_process my_main_process
# COPY my_helper_process my_helper_process
# COPY my_wrapper_script.sh my_wrapper_script.sh
# CMD ./my_wrapper_script.sh

# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application, assuming the entry point is in /app
CMD ["node", "server.js"]
