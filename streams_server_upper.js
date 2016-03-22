var http = require('http');
var fs = require('fs');
var Transform = require('stream').Transform;

var ts1 = new Transform;
var ts2 = new Transform;

ts1._transform = function(chunk, encoding, cb) {
	// lets tranform the data stream by making everything uppercase
	this.push(chunk.toString().toUpperCase());
	cb()
}

ts2._transform = function(chunk, encoding, cb) {
	// you could do another transform here...
	this.push(chunk);
	cb()
}

var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(ts2).pipe(ts1).pipe(res);
});
console.log("Starting streaming server...")
server.listen(8000);