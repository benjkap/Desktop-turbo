const port = 8100;

const express = require('express');
const mysql = require('mysql');
const moduleTest = require('./server_module/module');
const Test = require('./server_module/Class');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);




const con = mysql.createConnection({
    socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    host : '127.0.0.1',
    user: "root",
    password: "root",
    port:"8888"
});

con.connect(function (err){
    if(err) throw err;
    console.log("Connected!");
})


app.use(express.static(__dirname + '/assets/'));

app.get('/test',function(req, res, next){
    moduleTest.b();
    res.sendFile(__dirname + '/assets/views/index.html');
});

app.get('/view2',(req, res, next)=>{
    let test = new Test();
    test.testHello();
    res.sendFile(__dirname + '/assets/views/view2.html');
});

/*io.sockets.on('connection', (socket) =>{
    io.emit('Hello', 'A new connection on our website');
    socket.emit('Hello', 'Hello to you');
    socket.on('private massage', (from,msg) => {
        console.log('I received a private massage by ' + from + 'saying: ' + msg);
    });
    socket.on('disconnect', () => {
        io.emit('User disconnected');
    });
})*/

server.listen(port);
console.log('Serveur lancé!');

