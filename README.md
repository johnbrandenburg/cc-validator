## CC-Validator

uses Luhn's algorithm to validates a number 


## Testing for the First Time
```bash
cd cc-validator-service
npm i
npm run test

cd ../cc-validator
npm i
npm run test
```


## Local Machine Run First Time
### dependencies 
Node.js v22.14.0 - [download](https://nodejs.org/dist/v22.14.0/node-v22.14.0.pkg)

```bash
cd cc-validator-service
npm i
npm run dev

cd ../cc-validator
npm i
npm run dev
```

browse to http://localhost:3001

## Docker Run First time
### dependencies
Docker - [get-docker](https://docs.docker.com/get-started/get-docker/)

```bash
cd cc-validator-service
docker build -t cc-validator-service .
docker run -p 3000:8081 cc-validator-service

cd ../cc-validator
docker build -t cc-validator .
docker run -p 80:80 cc-validator
```

browse to http://localhost:80
