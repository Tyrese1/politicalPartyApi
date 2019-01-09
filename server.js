import express from 'express';
import politicalParty from './src/apiJsObject/controller/politicalParty';

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Server is live and running!'});
})


app.post('/api/v1/politicalPartys', politicalParty.create);
app.get('/api/v1/politicalPartys', politicalParty.getAll);
app.get('/api/v1/politicalPartys/:id', politicalParty.getOne);
app.put('/api/v1/politicalPartys/:id', politicalParty.update);
app.delete('/api/v1/politicalPartys/:id', politicalParty.delete);


app.listen(3000)
console.log('app running on port ', 3000);