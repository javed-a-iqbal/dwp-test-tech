# DWP-TEST-TECH-API

### Overview of the API

An API which calls https://dwp-techtest.herokuapp.com, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

## Dependencies

- Express
- Nodemon
- Mocha
- Chai
- Chai-http
- Nock
- Axios
- standard
- markdownlint-cli
- husky
- lint-staged
- commitlint/cli
- dotenv
- geolib
- nyc
- winston
- standard
- winston-daily-rotate-file
- geolib


## How to Run app Locally

clone the app

Setup

```
npm install
```

Run

```
npm start
```

### How to Call API

```
http://localhost:4000/users/people-living-in-london-or-within-50-miles/London

returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

http://localhost:4000/users/user-by-id/7

returns signle user if a valid id is passed

```

## Testing

Run

```

npm test

```
## logging


```
For logging we use winston 3.x.x to logs different actions, there are three type of logs, 1 success logs, audit logs  and error logs, when application run it will store logs in a folder mentioned in the .env file, three files will be get created to store logs, and will rotate every day as per current setting.


```

## Code Coverage

```
npm run coverage

To check code coverage in html format, please look into coverage folder and click index.html to open it in browser to see the detail output.

```

## Dockerfile
Info for building docker image
```

docker build -t dwp-test-tech .
spin up docker container in the backgroud
docker run -d -p 9000:4000 dwp-test-tech
http://localhost:9000/users/people-living-in-london-or-within-50-miles/London

```