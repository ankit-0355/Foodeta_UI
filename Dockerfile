FROM node:24.11.1

# Setup the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy other files and folders to the working directory
COPY . .

# Build Angular application in PROD mode
# RUN npm run build

# Start the app when container runs
CMD ["npm", "run", "start:prod"]