FROM node:alpine

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm i -g yarn
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "yarn", "start" ]