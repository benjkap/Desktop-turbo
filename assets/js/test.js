(function (){
    const socket = io.connect('http://localhost:8100');
    
    socket.on('Hello', (message) => {
        alert('le srveur a un message pour vous: ' + message);
    });

    function clicked() {
        console.log('clicked');
        socket.emit('private message', 'Marco', 'Salut serveur ça va?');
    }

    document.getElementById('clicked').addEventListener('click', clicked);
})();