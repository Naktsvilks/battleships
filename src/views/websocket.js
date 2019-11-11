websocket = new WebSocket('ws://localhost:8000');

websocket.onopen = function(event) {
    websocket.send('Sending text to server!');
};

websocket.onmessage = function(event) {
    console.log(event.data);
};
