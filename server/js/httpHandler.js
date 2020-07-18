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
    res.writeHead(200, headers); // assign statusCode and header to response
    res.end(); // asign data to reponse and  signals to the server that all of the response headers and body have been sent
    next(); // invoke next() at the end of a request to help with testing!
  }
  // TODO: why did the tests fail when we used else if?
  // if request method is equal to GET
  if (req.method === 'GET') {
    // case for command request
    if (req.url === '/') {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      // declare commandOptions array
      // let commandOptions = ['up', 'down', 'left', 'right'];
      // // get random command
      // let command = commandOptions[Math.floor(Math.random() * 4)];
      res.writeHead(200, headers); // assign statusCode and header to response
      res.end(messageQueue.dequeue()); // asign data to reponse and  signals to the server that all of the response headers and body have been sent
      next(); // invoke next() at the end of a request to help with testing!
    // case for background request
    } else if (req.url === '/background.jpg') {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      // detect is background image exist
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        // case for background image does not exist
        if (err) {
          res.writeHead(404, headers);
        // case for background image exist
        } else {
          res.writeHead(200, headers);
          res.write(data); // This sends a chunk of the response body
        }
        res.end();
        next();
      });
    }
  }
};
