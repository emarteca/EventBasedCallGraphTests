// stack overflow https://stackoverflow.com/questions/13338350/nodejs-writestream-empty-file
// the solution is they never wait until the stream is done being written before closing the file
// so, this is a dead emit through the createWriteStream



// added this code so it works
let fs = require('fs');
var base64data = "here comes some data".repeat(10000000);



// SE code

var buff = new Buffer(base64data,'base64');
// console.log(base64data);

var stream = fs.createWriteStream('./thefile.png');
stream.write(buff)
stream.end()