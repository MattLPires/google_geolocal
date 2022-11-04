const restify = require("restify");
//const errs = require('restify-errors');

const googleMapsClient = require('@google/maps').createClient({
    key:'AIzaSyCpwuQ_Nu8pXlNi-yhdOdyjMfmYKu1jbl4',
    Promise: Promise
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password:'',
        database:'db'
    }
});

const server = restify.createServer({
    name: "myapp",
    version: "1.0.0",
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/all", function(req, res, next) {
    knex('places').then((dados) => {
        res.send(dados);
        
    }, next)
  // return next();
});

server.get("/geocode", function(req, res, next) {
    googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'}).asPromise().then((responde) => {
        const address = response.json.results[0].formatted_address;
        const place_id = response.json.results[0].place_id;
        res.send({place_id, address});
    })
    .catch((err) => {
        res.send(err);
    });
});

server.listen(8082, function(){
    console.log("%s listening at %s", server.name, server.url);
});

