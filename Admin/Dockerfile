# Use Node.js 22 as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# build the app
RUN npm run build

# Expose the port Vite runs on
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--","--", "--host","0.0.0.0"]
