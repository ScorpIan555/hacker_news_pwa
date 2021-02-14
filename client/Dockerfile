FROM node:14

ENV PORT 8111

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN yarn 

# Copying source files
COPY . /usr/src/app

# Building app
RUN yarn build
EXPOSE 8111

# Running the app
CMD "yarn" "dev"