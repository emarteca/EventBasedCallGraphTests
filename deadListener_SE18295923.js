// https://stackoverflow.com/questions/18295923/nodejs-stdin-readable-event-not-triggered

// here the listener is added to "self" but never actually triggered, so this
// should return a dead listener error


// the fix for this code is just to uncomment the following line:
// process.stdin.resume();

// added this function to the code from SE so that it runs
function handleArguments() {
	console.log("Here, handling arguments");
}

var self = process.stdin, data ;

self.on('readable', function() {
    var chunk = this.read();
    if (chunk === null) {
        handleArguments();
    } else {
       data += chunk;
    }
});

self.on('end', function() {
   console.log("end event",data )
});
