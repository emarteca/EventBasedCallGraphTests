var fs = require('fs');

var res = fs.createWriteStream('file.txt');

// res.set({
//         'Content-Disposition': 'attachment; filename=destination.pdf',
//         'Content-Type': 'application/pdf'
//     });
var stream = fs.createReadStream('infile.txt');
stream.pipe(res).once("close", function () {
    stream.destroy(); 

    fs.unlink(file, function (err) {
        if (err) {
            console.error(err.toString());
        } else {
            console.warn(file + ' deleted');
        }
    });
});