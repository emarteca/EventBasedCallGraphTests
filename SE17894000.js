// stack overflow https://stackoverflow.com/questions/17894000/event-handling-not-working-as-expected-nodejs
// according to the solution, there are some errors with this code including a potential dead listener 
// in dotCom.on('close'), since it's inside another listener

// again, not sure exactly what the expected result of the analysis should be
// depends what we're looking for


var port = 43;
var net = require('net');
var host = 'whois.internic.net';
var dotCom = new net.Socket();
var c = 0;
var connections = 0;
var dotComStatus;
dotCom.setEncoding('ascii');

var searches = ['test1', 'test2', 'test3'];
search(searches.shift()); 

function chkconnections(z) {
  if (connections <= 0) {
       if (searches.length >= 1) {
            process.nextTick(function() {
                 search(searches.shift());
            });
       }
  }
}

function search(x) {
var q = "domain " + x + ".com\r\n";

dotCom.connect(port, host, function() {
    dotCom.write(q);
    console.log(q);
    connections++;
});

dotCom.on('data', function(data) {
    c++;
    if (c == 2) { 
         dotComStatus = data.split('\n')[1];
         dotCom.on('close', function() {
              console.log(dotComStatus);
              connections--;
              chkconnections();
         });
    }
});
}   