# Use official Node runtime
FROM node:22

# Set working directory inside container
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "app.js"]
