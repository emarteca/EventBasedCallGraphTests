// stack overflow https://stackoverflow.com/questions/19167407/data-event-not-firing-node-js
// the issue here is that both listeners are bound to "writing", while the first 
// one should actually be bound to "stream"
// this is a dead listener, since the first listener bound to "writing" is never triggered

// added this code so it works
let fs = require('fs'); 
let ytdl = require('ytdl-core');

// SE
var writing = fs.createWriteStream('video.mp4');
var stream = ytdl('https://www.youtube.com/watch?v=jofNR_WkoCE', { filter: function(format) { return format.container === 'mp4'; }, quality: "lowest" });
stream.pipe(writing);

var completed_len = 0;
var total_len = 0;

writing.on('data', function(chunk) {
    console.log('received data!');
    completed_len += chunk.length;
});

writing.on('close', function ()
{
    console.log('close');
    // res.send('completed!');
});