# Stage 1: Build React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./  
COPY package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . ./

# Copy .env (nếu cần build-time env)
COPY .env .env

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built app
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
