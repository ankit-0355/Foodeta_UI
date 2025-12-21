FROM node:24.11.1

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Install http-server globally
RUN npm install -g http-server

# Copy Angular build output
WORKDIR /app/dist/Foodeta_UI/browser

# Expose 8080 for Cloud Run
EXPOSE 8080

# Serve static files
CMD ["http-server", ".", "-p", "8080", "-c-1", "--silent"]
