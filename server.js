const port = 8080
const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(
express.static(__dirname)
);
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});
const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt'),
    protocols: [ 'h2' ] // 'spdy/3.1', ..., 'http/1.1' ],
}
spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + port + '.')
    }
})
