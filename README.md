## CC-Validator

uses Luhn's algorithm to validates a number 


## Running Tests for the First Time
### - `cd cc-validator-service`
### - `npm i`
### - `npm run test`

### - `cd ../cc-validator`
### - `npm i`
### - `npm run test`

## Running on Local Machine for the First Time
### dependencies 
Node.js v22.14.0 - [download](https://nodejs.org/dist/v22.14.0/node-v22.14.0.pkg)

### - `cd cc-validator-service`
### - `npm i`
### - `npm run dev`

### - `cd ../cc-validator`
### - `npm i`
### - `npm run dev`

## Running with Docker
### dependencies
Docker - [get-docker](https://docs.docker.com/get-started/get-docker/)

### - `cd cc-validator-service`
### - `docker build -t cc-validator-service .`
### - `docker run -p 3000:8081 cc-validator-service`

### - `cd ../cc-validator`
### - `docker build -t cc-validator .`
### - `docker run -p 80:80 cc-validator`
