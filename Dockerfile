# Use a specific version of Node.js
FROM node:20-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the CA file (if needed)
# Make sure to adjust the path to your actual CA file
COPY cafile.pem /etc/ssl/certs/cafile.pem

# Set npm to use the Nexus repository and configure the CA file
RUN npm config set registry https://nexus.kabeldeutschland.de/repository/npm/ && \
    npm config set cafile /etc/ssl/certs/cafile.pem

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
