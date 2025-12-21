# ---------- Build stage ----------
FROM node:24.11.1 AS build

WORKDIR /app
    
COPY package.json package-lock.json ./
RUN npm install
    
COPY . .
RUN npm run build
    
# ---------- Runtime stage ----------
FROM nginx:alpine
    
# Nginx must listen on 8080 for Cloud Run
COPY nginx.conf /etc/nginx/conf.d/default.conf
    
# ⚠️ Change this if your dist folder name is different
COPY --from=build /app/dist/Foodeta_UI/browser /usr/share/nginx/html
    
EXPOSE 8080
    
CMD ["nginx", "-g", "daemon off;"]
    