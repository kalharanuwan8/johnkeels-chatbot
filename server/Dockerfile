# Use official Node.js image
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define environment variables (Cloud Run sets PORT to 8080 by default)
ENV PORT=8080

# Start the application
CMD [ "node", "index.js" ]
