const port = 9000;
const http = require('http')
const API =  require('./ticketapp/config/app');    
const server = http.Server(API);

server.listen(port, () => {
    console.log("TICKET SERVER STARTED AT PORT 9000")
});