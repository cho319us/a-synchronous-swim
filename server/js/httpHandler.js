const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
  console.log("Is this an object?", messageQueue);
};

module.exports.router = (req, res, next = ()=>{}) => {
  // if request method is equal to OPTIONS
  if (req.method === 'OPTIONS') {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    res.writeHead(200, headers); // send a response statusCode and header
    res.end(); // assign data to reponse
    next(); // invoke next() at the end of a request to help with testing!
  }
  // TODO: why did the tests fail when we used else if?
  // if request method is equal to GET
  if (req.method === 'GET') {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    // declare commandOptions array
    // let commandOptions = ['up', 'down', 'left', 'right'];
    // // get random command
    // let command = commandOptions[Math.floor(Math.random() * 4)];
    res.writeHead(200, headers); // send a response statusCode and header
    res.end(messageQueue.dequeue()); // assign data to reponse
    next(); // invoke next() at the end of a request to help with testing!
  }
};
