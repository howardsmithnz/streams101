var Readable = require('stream').Readable;
var Transform = require('stream').Transform;

var rs1 = new Readable;
var ts1 = new Transform;

rs1.push('beep ');
rs1.push('boop\n');
rs1.push(null);

ts1._transform = function(chunk, encoding, cb) {
	// console.log("typeof chunk is: ", (typeof chunk))
	// console.log(chunk)
	this.push(chunk.toString().toUpperCase());
	cb()
}


rs1.pipe(ts1).pipe(process.stdout);