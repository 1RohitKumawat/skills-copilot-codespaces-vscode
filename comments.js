// create a server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res) {
    var parseUrl = url.parse(req.url, true);
    var pathname = parseUrl.pathname;
    if(pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if(err) {
                console.log(err);
                res.end('404 Not Found');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if(pathname === '/submit') {
        var comment = parseUrl.query;
        comments.push(comment);
        res.end('submit success');
    } else if(pathname === '/getComments') {
        var str = JSON.stringify(comments);
        res.end(str);
    } else {
        var filepath = path.join(__dirname, pathname);
        fs.readFile(filepath, function(err, data) {
            if(err) {
                console.log(err);
                res.end('404 Not Found');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(3000, function() {
    console.log('listening on 3000');
});