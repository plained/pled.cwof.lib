var fs = require('fs'),
    path = require('path'),
    request = require('request');

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
        var basePath = 'https://raw.githubusercontent.com/plained/pled.cwof.lib/master/resources';
        var filePath = basePath + resourcePath + '.json';
        console.log(filePath);
        request({url: filePath, 
                headers:[{"Content-Type": "application/json",
                        "Cache-Control": "private, no-cache, no-store, must-revalidate",
                        "Expires": "-1",
                        "Pragma": "no-cache"
                }]}, 
                function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.writeHead(200, {"Content-Type": "application/json",
                                    "Cache-Control": "private, no-cache, no-store, must-revalidate",
                                    "Expires": "-1",
                                    "Pragma": "no-cache"
                                    });
                res.write(body);
                res.end();                  
            }
            else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.write('{"r":"Resource ' + resourcePath + ' unavailable"}');
                res.end();        
            }
        })
    },
    updResource: function(req,res){
        res.writeHead(404, {"Content-Type": "application/json"});
        res.write('{"r":"Resource ' + resourcePath + ' changed successfully"}');
        res.end();        
    }
}