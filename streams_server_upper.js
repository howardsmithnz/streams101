var http = require('http');
var fs = require('fs');
var Transform = require('stream').Transform;

var ts1 = new Transform;

ts1._transform = function(chunk, encoding, cb) {
	// console.log("typeof chunk is: ", (typeof chunk))
	// console.log(chunk)
	this.push(chunk.toString().toUpperCase());
	cb()
}

var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(ts1).pipe(res);
});
console.log("Starting streaming server...")
server.listen(8000);