# Node

## To begin

`npm/yarn init`

## If Windows and no NPM:

```yml
version: "3.5"

services:
  node:
    image: node:alpine
    volumes:
      - .:/app
    working_dir: /app
    command: npm run build:live
    ports:
      - 3000:3000

```

Take the yml file above and write:  
`docker-compose up`  
`docker-compose run node sh`  
Then run `npm init`

## Dependencies

`npm add -s express`  
`npm add -D nodemon`  
`npm add -s body-parser`

# Nodemon config

```json
"scripts": {
    "build:live": "nodemon --watch 'src/**' src/index.js",

    "build:windows": "nodemon -L 'src/**' src/index.js"
},
```