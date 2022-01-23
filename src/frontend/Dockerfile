FROM node:14-alpine as builder

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

# nginx state for serving content
FROM nginx:alpine



COPY conf.d/ /etc/nginx

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

## Remove default.conf nginx index page
RUN rm -rf ./*

# Copy from the stahg 1
COPY --from=builder /app/dist .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
