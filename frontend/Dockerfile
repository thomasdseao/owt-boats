# Use the official Node runtime as a base image
FROM node:20.8.0 as build

# Set the working directory
WORKDIR /app

# Copy the rest of the code
COPY . .

# Clear npm cache and install Angular CLI and node modules
RUN rm -Rf node_modules
RUN npm cache clean -f
RUN npm install -g @angular/cli
RUN npm install --no-optional


# List files (for debugging)
RUN ls -lah

# Build the Angular app
RUN ng build

# Use Nginx for serving the build
FROM nginx:alpine

# Copy from build stage to nginx html folder
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy custom nginx configuration
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
