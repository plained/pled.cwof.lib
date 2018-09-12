var fs = require('fs'),
    path = require('path');

exports = module.exports = {
    getDefaultResponse: function (req, res)
    {
        //var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        //console.log("Connection from " + ip)
        var apiUri = req.headers.host + '/<resource>';
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write('{"r":"API Server is healthy. Access the api using ' + apiUri + '"}');
        //res.write('{"r":"API Server is healthy"}');
        res.end();
    },
    getResource: function (req, res)
    {
        var resourcePath = req.url;
        var basePath = path.dirname(fs.realpathSync(__filename)) + '/../resources';
        var filePath = basePath + resourcePath + '.json';
        console.log(filePath);
        if (fs.existsSync(filePath)) {
            var resourceJson = fs.readFileSync(filePath);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(resourceJson);
            res.end();            
        }
        else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.write('{"r":"Resource ' + resourcePath + ' unavailable"}');
            res.end();
        }
    }
}