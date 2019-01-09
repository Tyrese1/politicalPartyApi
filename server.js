import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';


import politicalPartyApiDatabase from './src/apiJsonDb/controller/politicalParty';

dotenv.config();


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Server is live and running!'});
})

//API endpoints
app.post('/api/v1/politicalPartys', politicalPartyApiDatabase.create);
app.get('/api/v1/politicalPartys', politicalPartyApiDatabase.getAll);
app.get('/api/v1/politicalPartys/:id', politicalPartyApiDatabase.getOne);
app.put('/api/v1/politicalPartys/:id', politicalPartyApiDatabase.update);
app.delete('/api/v1/politicalPartys/:id', politicalPartyApiDatabase.delete);



app.listen(3000)
console.log('app running on port ', 3000);