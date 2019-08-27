//importing server
const server = require('./server');

//setting the port
const port = 7000;

//enableling the server
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
