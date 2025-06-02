FROM node:alpine3.19 as build

RUN mkdir -p /app 

WORKDIR /app 

COPY package*.json ./

RUN npm install 


COPY . . 
RUN npm run build 

# Serve application 

RUN npm install -g serve
EXPOSE 80

CMD ["npx", "serve", "-s", "dist", "-l", "80"]



