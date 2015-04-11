var fs = require('fs');

fs.open("accidents.sav", 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    var buffer = new Buffer(1000);
    fs.read(fd, buffer, 0, 1000, 0, function(err, num) {
        console.log(buffer.toString('utf-8', 0, num));
    });
});