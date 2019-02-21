import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';


import politicalPartyApiDatabase from './src/apiJsonDb/controller/politicalParty';

dotenv.config();

const app = express()

const http = require('http');  
app.use(express.json())
const path = require('path');

//Enable cross-origin resource sharing (CORS) 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",'GET,HEAD,PUT,PATCH,POST,DELETE',);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Load html page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//API endpoints
app.post('/api/v1/politicalPartys', politicalPartyApiDatabase.create);
app.get('/api/v1/politicalPartys', politicalPartyApiDatabase.getAll);
app.get('/api/v1/politicalPartys/:id', politicalPartyApiDatabase.getOne);
app.put('/api/v1/politicalPartys/:id', politicalPartyApiDatabase.update);
app.delete('/api/v1/politicalPartys/:id', politicalPartyApiDatabase.delete);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App is running on port " + port);
});

