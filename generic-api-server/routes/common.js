exports = module.exports = {
    getDefaultResponse: function (req, res)
    {
        var apiUri = req.headers.host + '/<resource>';
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write('{"r":"API Server is healthy. Access the api using ' + apiUri + '"}');
        res.end();
    }
}