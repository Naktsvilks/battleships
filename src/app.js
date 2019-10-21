let thingy = '';

function changeThingy(req, res) {
    res.send(`Thingy was ${thingy} and is now ${req.body.thingy}`);
    thingy = req.body.thingy;
}

function hello(req, res) {
    res.send('Hello world!');
    console.log('ping');
}

exports.bunny = hello;
exports.thingy = changeThingy;
