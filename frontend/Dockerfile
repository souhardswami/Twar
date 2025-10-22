FROM node:22.13.1-slim
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code into the container
COPY . .

RUN npm run build
EXPOSE 3000
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]