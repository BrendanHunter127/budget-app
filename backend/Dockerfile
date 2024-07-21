# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Install PostgreSQL client tools
RUN apk --no-cache add postgresql-client

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the wait-for-it.sh script and init-db.sh
COPY wait-for-it.sh /app/
COPY init-db.sh /docker-entrypoint-initdb.d/
RUN chmod +x /app/wait-for-it.sh /docker-entrypoint-initdb.d/init-db.sh

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "dist/main.js"]
