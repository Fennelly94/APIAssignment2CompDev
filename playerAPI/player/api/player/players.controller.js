var _ = require('lodash')
var datastore = require('../datastore');

// Get list of contacts
exports.index = function(req, res) {
    return res.json(200, datastore.players);
} ;

// Creates a new player in datastore.
exports.create = function(req, res) {
    var nextId = 0
    var last = _.last(datastore.players)
    if (last != undefined) {
       nextId = last.id + 1
    } else {
      nextId = 1
    }
    var player = {
       id: nextId,
       name: req.body.name,
       age: req.body.age,
       phone_number: req.body.phone_number  
    };
    datastore.players.push(player)
    return res.json(201, player);
};

// Update an existing player in datastore.
exports.update = function(req, res) {
      var index = _.findIndex(datastore.players, function(player) {
           return player.phone_number == req.params.id;
        } );      
      if (index !== -1) {
          datastore.players.splice(index, 1, 
               {name: req.body.name, age: req.body.age , 
                         phone_number: req.body.phone_number });
          return res.send(200);
        } 
      return res.send(404) ;
};

// Deletes a player from datastore.
exports.destroy = function(req, res) {
    var elements = _.remove(datastore.players , 
           function(player) {
              return player.phone_number == req.params.id;
        });  
     if (elements.length == 1) {
        return res.send(200);
        }
      else
        {
         return res.send(404)
      }
};