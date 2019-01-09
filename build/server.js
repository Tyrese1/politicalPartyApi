'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _politicalParty = require('./src/apiJsonDb/controller/politicalParty');

var _politicalParty2 = _interopRequireDefault(_politicalParty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.get('/', function (req, res) {
  return res.status(200).send({ 'message': 'Server is live and running!' });
});

//API endpoints
app.post('/api/v1/politicalPartys', _politicalParty2.default.create);
app.get('/api/v1/politicalPartys', _politicalParty2.default.getAll);
app.get('/api/v1/politicalPartys/:id', _politicalParty2.default.getOne);
app.put('/api/v1/politicalPartys/:id', _politicalParty2.default.update);
app.delete('/api/v1/politicalPartys/:id', _politicalParty2.default.delete);

app.listen(3000);
console.log('app running on port ', 3000);