FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json /app
RUN npm install
COPY . /app
CMD [ "npm", "start" ]
# Info for building docker image
# docker build -t dwp-test-tech .
# spin up docker container in the backgroud
# docker run -d -p 9000:4000 dwp-test-tech
# http://localhost:9000/people-living-in-london-or-within-50-miles/London
