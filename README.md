# Gottto

A simple website that loads other websites.

## Development

Install dependencies

    npm install

Install [nodemon](https://github.com/remy/nodemon)

    npm install -g nodemon

To run the server

    nodemon web.js

Or with node

    foreman start

## Deployment

This project is deployed to [heroku](http://www.heroku.com/), and can only be done by people who are collaborators.

Firstly, add the remote heroku branch

    git remote add heroku git@heroku.com:gottto.git

Push to

    git push heroku master