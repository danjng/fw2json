FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/img
RUN mkdir -p /usr/src/app/public
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY index.html /usr/src/app/public
RUN npm install
RUN npm install csvtojson
#RUN npm install csv
RUN npm install connect-busboy
RUN npm install path
RUN npm install fs-extra
RUN npm install fixy

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]