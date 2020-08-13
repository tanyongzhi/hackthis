# HackThis - Book Stop

This is our submission for the [HackThis](http://hackthis.hackillinois.org/) hackathon organized by HackIllinois.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
Before we begin, install the following:  
- node and npm
- git

### Project Structure
The backend portion of the project is stored in the root directory. The frontend of the project is in the `./frontend` folder

### Continuous Integration
CI/CD has been set up with the frontend being delpoyed via netlify, and the backend being deployed via Heroku.

### Installing

Naviate to the root folder and run:  
`npm install`

Set the following environment variables in `./.env`  
`CLIENT_ID`: client id for Google api  
`CLIENT_SECRET`: client secret for Google api  

### Running the app
To start the frontend, navigate to ./frontend and run:  
`npm start`  
To start the backend, navigate to root diretory and run:  
`node app.js`

## Built With
- React
- Express
- MongoDB


## Authors

* [**Yong Zhi Tan**](https://github.com/tanyongzhi)  - *Backend* 

* [**Yi Shian Ho**](https://github.com/hoyishian) - *Frontend* 
