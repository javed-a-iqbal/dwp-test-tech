# DWP-TEST-TECH-API

### Overview of the API

An API which calls https://bpdts-test-app.herokuapp.com/, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

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
http://localhost:4000/people-living-in-london-or-within-50-miles/London

returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

```
###  find people by id (optional work will be added later in future)

```
http://localhost:4000/people-by-id/135 (return user by id)

```

## Testing

Run

```

npm test

```

## Code Coverage

```
npm run coverage

To check code coverage in html format, please look into coverage folder and click index.html to open it in browser to see the detail output.

```